from langchain_community.tools import TavilySearchResults
from dotenv import load_dotenv
from langchain_community.utilities import OpenWeatherMapAPIWrapper
from langchain_core.tools import tool
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from llm import LLM
from chroma_db import VectorDB
from db_operation import insert_notification
# Load environment variables
load_dotenv()

# Initialize LLM
llm = LLM().model

# Initialize tools
tavily_tool = TavilySearchResults(
    max_results=2,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
    include_images=True,
)

weather_tool = OpenWeatherMapAPIWrapper()

# Define a prompt template to extract the city name
prompt_template = PromptTemplate(
    input_variables=["query"],
    template="Extract the name of the city from the following query: '{query}'. Return only the city name and nothing else."
)

# Create a chain to extract the city name using RunnableSequence
city_extraction_chain = (
    RunnablePassthrough()  # Pass the input directly to the prompt
    | prompt_template     # Apply the prompt template
    | llm                 # Pass the output to the LLM
)

def extract_city_name(query: str) -> str:
    """
    Extracts the city name from a user query using LangChain.
    """
    # Run the chain to extract the city name
    city_name = city_extraction_chain.invoke({"query": query})
    return city_name.content.strip()  # Remove any extra whitespace

@tool
def search_weather(query: str):
    """
    Searches for weather data using the extracted city name.
    """
    # Extract the city name from the query
    city_name = extract_city_name(query)
    print(f"Extracted city name: {city_name}")

    # Fetch weather data using the city name
    weather_data = weather_tool.run(city_name)
    return weather_data

@tool
def search_news(query: str):
    """
    Searches for news related to supply chain risks.
    """
    # Use the Tavily tool to search for news
    results = tavily_tool.invoke({"query": query})
    return results[-1]['content']

@tool
def monitor_supplier_performance(supplier_id: str):
    """
    Monitors supplier performance based on supplier ID.
    """
    performance_data = VectorDB("order").collection.get()
    return performance_data

def analyze_data(alerts: list) -> str:
    """
    Analyzes all alerts and generates precise, actionable insights using an LLM.
    """
    # Combine all alerts into a single string
    combined_alerts = "\n".join(alerts)

    # Define a prompt for the LLM to analyze the alerts
    analysis_prompt = f"""
    You are a supply chain risk analyst. Analyze the following alerts and provide a concise, actionable summary of the most critical issue also use data from orders to add it in your context.

    Alerts:
    {combined_alerts}

    Instructions:
    1.  Identify the single most pressing supply chain risk.
    2.  Summarize the risk in one or two short sentences.
    3.  Focus on actionable insights and potential impacts.
    4.  Return only the summary, do not return anything else.

    Example:
    Alerts: Weather alert: extreme heat in Texas. Supplier alert: delayed shipments from Texas.
    Summary: Extreme heat in Texas is delaying supplier shipments, potentially causing production delays.

    Summary:
    """

    # Use the LLM to analyze the alerts
    analysis_result = llm.invoke(analysis_prompt)
    print(insert_notification(analysis_result.content, 1, "Supply Chain Risk Analysis")) # Insert the analysis into the database
    return analysis_result.content

def generate_alerts():
    """
    Generates alerts for supply chain risks and analyzes them.
    """
    alerts = []

    # Example: Monitor weather risks
    weather_query = "What's the weather like in New York?"
    weather_data = search_weather.invoke(weather_query)  
    if "extreme" in weather_data.lower():
        alerts.append(f"Weather alert: {weather_data}")

    # Example: Monitor news for factory shutdowns
    news_query = "factory shutdown supply chain"
    news_data = search_news.invoke(news_query)  
    if "shutdown" in news_data.lower():
        alerts.append(f"Factory shutdown alert: {news_data}")

    # Example: Monitor supplier performance
    supplier_data = monitor_supplier_performance.invoke(input="12345")  
    alerts.append(f"Supplier alert: {supplier_data}")

    # Analyze all alerts and generate precise insights
    analysis_result = analyze_data(alerts)
    alerts.append(f"Analysis and Recommendations: {analysis_result}")

    return alerts[-1]

