from dotenv import load_dotenv
import os 
from typing import TypedDict, Annotated
from langchain_core.messages import AnyMessage
import operator
from langgraph.graph import StateGraph, END
from langchain_core.messages import AnyMessage, SystemMessage, HumanMessage, ToolMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from agent.chroma_db import VectorDB

load_dotenv()   

class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]

class Agent:
    def __init__(self, model, tools, system=""):
        self.system = system
        graph = StateGraph(AgentState)
        graph.add_node("llm", self.call_openai)
        graph.add_node("action", self.take_action)
        graph.add_conditional_edges(
            "llm",
            self.exists_action,
            {True: "action", False: END}
        )
        graph.add_edge("action", "llm")
        graph.set_entry_point("llm")
        self.graph = graph.compile()

        print("Tools: ", tools)
        self.tools = {t.name: t for t in tools}  # Store tools correctly
        self.model = model.bind_tools(tools)

    def exists_action(self, state: AgentState):
        result = state['messages'][-1]
        return len(result.tool_calls) > 0

    def call_openai(self, state: AgentState):
        messages = state['messages']
        if self.system:
            messages = [SystemMessage(content=self.system)] + messages
        message = self.model.invoke(messages)
        return {'messages': [message]}

    def take_action(self, state: AgentState):
        tool_calls = state['messages'][-1].tool_calls
        print("Tool calls: ", tool_calls)
        results = []
        for t in tool_calls:
            print(f"Calling: {t['name']}")
            if t['name'] not in self.tools:  # Check for bad tool name
                print("\n ....bad tool name....")
                result = "bad tool name, retry"  # Instruct LLM to retry
            else:
                result = self.tools[t['name']].invoke(t['args'])  # Invoke the tool properly
            results.append(ToolMessage(tool_call_id=t['id'], name=t['name'], content=str(result)))
        print("Back to the model!")
        return {'messages': results}


model = ChatGoogleGenerativeAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    
)




@tool
def search_history(collection_name: str) -> str:
    """Search for data in specific tables/collections. Available collections:
    - product: Product details (price, cost, margin, stock).
    - order: Sales history and quantities sold.
    - supplier: Supplier reliability and lead times.
    - driver: Delivery performance data.
    - notification: User notifications and alerts.
    
    collection_name: Name of the table/collection to search (product, order, supplier, driver, notification).
    """
    return VectorDB(collection_name).collection.get()

@tool
def calculate_profit(price: float, cost: float) -> float:
    """Calculate the profit per unit: (price - cost)."""
    return price - cost

@tool 
def search_most_frequent_product() -> str:  # Corrected spelling
    """Search for the most frequently sold products using order history."""
    return VectorDB("order").collection.get()  

@tool
def search_positive_reviews() -> str:
    """Search for products with positive reviews."""
    postive_feedback = ["good", "great", "excellent", "happy", "satisfied", "positive", "nice", "amazing"]
    return VectorDB("order").search(" ".join(postive_feedback))


prompt = """You are a profit optimization assistant. Follow these steps:

1. FIRST use search_history(collection_name="product") to get all products.
2. For EACH product, call calculate_profit(price, cost).
3. THEN use search_most_frequent_product() to get top-selling items.
4. THEN use search_positive_reviews() to get top-rated items.
5. Recommend ONLY products that meet **at least 2 of these 3 criteria**:
   - High profit margin  
   - Frequently sold  
   - Highly rated  

Format the response like a message for a chat application:

"📢 **Recommended Products for profit Increase**  

Based on sales volume, profit margins, and customer reviews, we recommend increasing stock for the following products:  

✅ **Smartwatch  
💰 **Profit Margin:** 65.5% (Price: $200.00, Cost: $69.00)  
📊 **Sales Volume:** High  
⭐ **Customer Reviews:** Positive  
🔍 **Reason:** This product is highly profitable, frequently sold, and well-reviewed—making it an ideal candidate for restocking.  

✅ **Monitor
💰 **Profit Margin:** 50.0% (Price: $300.00, Cost: $150.00)  
📊 **Sales Volume:** High  
⭐ **Customer Reviews:** Neutral  
🔍 **Reason:** While not the highest-rated, this product has strong sales and a good profit margin, making it a solid choice for increasing stock.  
"""


abot = Agent(model, [search_history,calculate_profit,search_most_frequent_product,search_positive_reviews], system=prompt)  

# Run the agent
messages = [HumanMessage(content="What product(s) should noy I buy more of to raise my profits?")]  
result = abot.graph.invoke({"messages": messages})  
print(result['messages'][-1].content)
