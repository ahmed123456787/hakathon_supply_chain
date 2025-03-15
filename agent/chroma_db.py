from langchain_chroma import Chroma
import chromadb
from langchain_openai.embeddings import AzureOpenAIEmbeddings
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class VectorDB:
    def __init__(self, collection_name: str):
        # Initialize Azure OpenAI Embeddings
        self.embeddings = AzureOpenAIEmbeddings(
            azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),  # Use azure_endpoint instead of openai_api_base
            api_key=os.environ.get("OPENAI_API_KEY"),
            model="text-embedding-ada-002",  # Model name
            deployment="text-embedding-ada-002-2",  # Deployment name
            api_version="2023-05-15"  # API version
        )

        # Initialize Chroma DB
        self.persistent_client = chromadb.PersistentClient()
        self.collection = self.persistent_client.get_or_create_collection(collection_name)
        self.vector_store = Chroma(
            client=self.persistent_client,
            collection_name=collection_name,
            embedding_function=self.embeddings,
        )

    def filter(self, **kwargs):
        """
        Filter documents in the collection based on metadata or other criteria.
        This is a placeholder implementation. Replace with actual filtering logic.
        """
        # Example: Filter by metadata
        return self.collection.get(where=kwargs)

    def search(self, query: str, k: int = 5) -> list[str]:
        """
        Return a list of search results (list of strings) based on similarity search.
        """
        results = self.vector_store.similarity_search(query, k)
        return [result.page_content for result in results]

    def insert(self, document: str):
        """
        Insert a document into the database.
        """
        self.vector_store.add_texts([document])