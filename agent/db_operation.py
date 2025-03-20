from database_connection import create_connection


from sqlalchemy import text
from datetime import datetime

def insert_notification(message: str, sender_user_id: int, subject: str):
    connection = create_connection()
    
    try:
        query = text("""
            INSERT INTO notification (message, date, SenderUserID, subject, ReceiverUserID) 
            VALUES (:message, :date, :sender_user_id, :subject, :receiver_user_id)
        """)
        
        params = {
            "message": message,
            "date": datetime.now(),  # Current timestamp
            "sender_user_id": sender_user_id,
            "subject": subject,
            "receiver_user_id": sender_user_id  # Same as SenderUserID
        }

        with connection.begin():  # Ensures the transaction is committed or rolled back
            connection.execute(query, params)

        return "Notification inserted successfully!"

    except Exception as e:
        return f"Error inserting notification: {str(e)}"

    finally:
        connection.close()
