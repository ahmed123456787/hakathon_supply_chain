import json
import pyodbc
from chroma_db import VectorDB
from apscheduler.schedulers.background import BackgroundScheduler
from database_connection import create_connection
from sqlalchemy import text
import time

# Tables to sync
TABLES = ["order", "product", "customer", "user", "supplier", "notification", "driver"]

def get_last_inserted_id(conn, table_name):
    """Get the last inserted ID for a given table"""
    try:
        print(f"🔍 Fetching last inserted ID for table: {table_name}...")

        # Execute the query and fetch the result
        result = conn.execute(
            text("SELECT last_id FROM sync_tracker WHERE table_name = :table_name"),
            {"table_name": table_name}
        )
        row = result.fetchone()

        if row:
            last_id = row[0]
            print(f"✅ Last inserted ID for {table_name}: {last_id}")
        else:
            last_id = 0
            conn.execute(
                text("INSERT INTO sync_tracker (table_name, last_id) VALUES (:table_name, :last_id)"),
                {"table_name": table_name, "last_id": last_id}
            )
            conn.commit()
            print(f"🆕 Added new tracking entry for {table_name} with last_id = 0")

        # Ensure the result is fully consumed
        result.close()
        return last_id

    except Exception as e:
        print(f"❌ Error getting last inserted ID for {table_name}: {e}")
        return 0


def update_last_inserted_id(conn, table_name, last_id):
    """Update the last inserted ID"""
    try:
        print(f"🔄 Updating last inserted ID for {table_name} to {last_id}...")
        
        # Execute the update query
        conn.execute(
            text("UPDATE sync_tracker SET last_id = :last_id WHERE table_name = :table_name"),
            {"last_id": last_id, "table_name": table_name}
        )
        conn.commit()

        print(f"✅ Successfully updated last inserted ID for {table_name}")

    except Exception as e:
        print(f"❌ Error updating last inserted ID for {table_name}: {e}")


def fetch_new_data(conn, table_name, last_id):
    """Fetch new data with column names"""
    try:
        print(f"📥 Fetching new data from {table_name} where ID > {last_id}...")

        # Fetch column names dynamically
        result = conn.execute(text(f"SELECT TOP 1 * FROM [{table_name}]"))
        column_names = [col for col in result.keys()]  # Extract column names
        result.close()  # Close the result to free the connection

        # Fetch new records
        result = conn.execute(
            text(f"SELECT * FROM [{table_name}] WHERE {table_name}id > :last_id"),
            {"last_id": last_id}
        )
        rows = result.fetchall()

        data = [dict(zip(column_names, row)) for row in rows]  # Map column names to values

        print(f"✅ Retrieved {len(rows)} new records from {table_name}")
        return data

    except Exception as e:
        print(f"❌ Error fetching new data from {table_name}: {e}")
        return []


def sync_table_to_chromadb(table_name):
    """Sync the data from SQL Server to ChromaDB using a dedicated connection"""
    print(f"🔄 Syncing table {table_name} to ChromaDB...")

    # Create a new connection for this table
    conn = create_connection()
    if not conn:
        print(f"❌ Failed to connect to the database for table {table_name}")
        return

    try:
        last_id = get_last_inserted_id(conn, table_name)
        rows = fetch_new_data(conn, table_name, last_id)

        if not rows:
            print(f"⚠️ No new data for table {table_name}. Skipping sync.")
            return

        # Initialize ChromaDB collection
        vector_db = VectorDB(collection_name=table_name)
        print(f"✅ ChromaDB collection '{table_name}' initialized")

        max_id = last_id
        for row in rows:
            # Convert the row dictionary to a JSON string
            document = json.dumps(row, default=str)  # Use `default=str` to handle non-serializable types like datetime
            print(f"📄 Document to embed: {document}")

            # Generate embeddings for the document
            embedding_vector = vector_db.embeddings.embed_documents([document])
            print(f"🧩 Generated embedding vector of length: {len(embedding_vector[0])}")

            # Use the first column as the document ID
            doc_id = f"{table_name}_{row[next(iter(row))]}"
            print(f"🆔 Document ID: {doc_id}")

            # Add the document to ChromaDB
            vector_db.collection.add(
                ids=[doc_id],
                embeddings=embedding_vector,  # Pass the embedding vector
                documents=[document],  
                metadatas=[{"source": table_name}]  # Optional: Add metadata
            )
            print(f"✅ Added document {doc_id} to ChromaDB")

            # Update the max_id
            max_id = max(max_id, int(row[next(iter(row))]))

        # Update the last inserted ID in the sync tracker
        update_last_inserted_id(conn, table_name, max_id)
        print(f"✅ Inserted {len(rows)} new records into ChromaDB for {table_name}.")

    except Exception as e:
        print(f"❌ Error syncing table {table_name}: {e}")

    finally:
        # Close the connection after syncing the table
        conn.close()
        print(f"🔒 Closed connection for table {table_name}")


def sync_all_tables():
    """Sync all tables using separate connections for each table"""
    print("🚀 Starting data sync for all tables...")

    for table in TABLES:
        sync_table_to_chromadb(table)


if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    sync_all_tables()
    scheduler.add_job(sync_all_tables, "interval", hours=24)
    
    print("⏳ Data transfer job scheduled. Running every 24 hours...")
    scheduler.start()

    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        print("🛑 Stopping scheduler...")
        scheduler.shutdown()