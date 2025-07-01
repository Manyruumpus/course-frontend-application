from pydantic import BaseModel, Field
from typing import List, Optional


class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Unique id for the conversation session")
    message: str


class ChatResponse(BaseModel):
    response: str
    tools_used: Optional[List[str]] = None