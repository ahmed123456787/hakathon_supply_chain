from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.model import ChatRequest
from langchain_core.messages import HumanMessage
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from agent import abot
from supply_risk_agent import generate_alerts
from stock_risk_model import main as stock_risk_model
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5172",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


 

@app.post("/chat")
async def chat(request: ChatRequest):
    print("test",request.message)
    messages = [HumanMessage(content=request.message)]  
    result = abot.graph.invoke({"messages": messages})  
    return {"response": result['messages'][-1].content}

@app.get("/notification-system")
async def notification_system():
    return {"response": generate_alerts()}

@app.get("/stock-risk")
async def stock_risk():
    res = stock_risk_model()
    print("rest",res)
    return res

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)