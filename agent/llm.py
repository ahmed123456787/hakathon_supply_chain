
from langchain_google_genai import ChatGoogleGenerativeAI
import os 
from dotenv import load_dotenv
load_dotenv()

class LLM:
    def __init__(self):
        self.model = ChatGoogleGenerativeAI(
        api_key=os.getenv("GEMINI_API_KEY"),
        model="gemini-1.5-pro",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        )