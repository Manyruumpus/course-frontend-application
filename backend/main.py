import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool

from .schemas import ChatRequest, ChatResponse
from .agent import get_agent

app = FastAPI(title="Calendar Booking Agent API", version="0.1.0")

# Allow all origins for ease of deployment; adjust as needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(payload: ChatRequest):
    if not payload.message:
        raise HTTPException(status_code=400, detail="Message is required")

    agent = get_agent(payload.session_id)
    result = await run_in_threadpool(agent.invoke, payload.message)

    # result may be dict w/ output; ensure string
    response_text = result if isinstance(result, str) else result.get("output", str(result))

    tools_used = (
        [step["tool"] for step in result.get("intermediate_steps", [])]
        if isinstance(result, dict)
        else None
    )

    return ChatResponse(response=response_text, tools_used=tools_used)