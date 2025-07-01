import datetime as dt
import os
from typing import List

from langchain.agents import initialize_agent, AgentType, Tool
from langchain.chat_models import ChatOpenAI
from langchain.tools import tool
from langchain.memory import ConversationBufferMemory

from . import calendar_utils as cal

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(model_name="gpt-3.5-turbo-0125", temperature=0)


# --------------------------- Tool definitions --------------------------- #


@tool
def check_availability(date_iso: str, duration_minutes: int = 30) -> List[str]:
    """Check available slots for a given ISO date string (YYYY-MM-DD) and desired duration in minutes. Returns list of ISO time ranges."""
    date = dt.date.fromisoformat(date_iso)
    slots = cal.find_free_slots(date, duration_minutes=duration_minutes)
    human_readable = [
        f"{s.isoformat()} to {e.isoformat()}" for s, e in slots
    ]
    return human_readable


@tool
def book_meeting(
    start_iso: str,
    end_iso: str,
    summary: str = "Meeting",
    description: str = "Scheduled via AI agent",
    attendees: List[str] | None = None,
) -> str:
    """Book a calendar event. Provide start and end datetime in ISO format. Returns the event htmlLink."""
    start_dt = dt.datetime.fromisoformat(start_iso)
    end_dt = dt.datetime.fromisoformat(end_iso)
    event = cal.create_event(summary, description, start_dt, end_dt, attendees=attendees)
    return event.get("htmlLink", "")


@tool
def is_slot_free(start_iso: str, end_iso: str) -> bool:
    """Return True if the slot defined by ISO start and end datetimes is free."""
    start_dt = dt.datetime.fromisoformat(start_iso)
    end_dt = dt.datetime.fromisoformat(end_iso)
    return cal.is_slot_free(start_dt, end_dt)


TOOLS = [check_availability, is_slot_free, book_meeting]


# --------------------------- Agent Factory ----------------------------- #


_memory_store: dict[str, ConversationBufferMemory] = {}


def get_or_create_memory(session_id: str):
    if session_id not in _memory_store:
        _memory_store[session_id] = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    return _memory_store[session_id]


def get_agent(session_id: str):
    memory = get_or_create_memory(session_id)
    agent = initialize_agent(
        TOOLS,
        llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        memory=memory,
        verbose=False,
    )
    return agent