from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from datetime import datetime, timedelta
import pytz
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from langchain_openai import ChatOpenAI
from langchain.tools import tool
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from typing_extensions import Annotated, TypedDict
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Calendar Booking Agent API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"

class ChatResponse(BaseModel):
    response: str
    booking_made: bool = False
    booking_details: Optional[Dict] = None

# Google Calendar Service
class GoogleCalendarService:
    def __init__(self):
        # Load service account credentials
        self.credentials = None
        self.service = None
        self.initialize_service()
    
    def initialize_service(self):
        try:
            # Try to load from service account file
            creds_file = os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE', 'service-account-key.json')
            if os.path.exists(creds_file):
                self.credentials = Credentials.from_service_account_file(
                    creds_file,
                    scopes=['https://www.googleapis.com/auth/calendar']
                )
            else:
                # Try to load from environment variable (JSON string)
                creds_json = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')
                if creds_json:
                    import json
                    creds_info = json.loads(creds_json)
                    self.credentials = Credentials.from_service_account_info(
                        creds_info,
                        scopes=['https://www.googleapis.com/auth/calendar']
                    )
            
            if self.credentials:
                self.service = build('calendar', 'v3', credentials=self.credentials)
                print("Google Calendar service initialized successfully")
            else:
                print("Warning: Google Calendar credentials not found")
                
        except Exception as e:
            print(f"Error initializing Google Calendar service: {e}")
    
    def get_calendar_id(self):
        """Get the primary calendar ID or a test calendar ID"""
        calendar_id = os.getenv('GOOGLE_CALENDAR_ID', 'primary')
        return calendar_id
    
    def check_availability(self, start_time: datetime, end_time: datetime):
        """Check if a time slot is available"""
        try:
            calendar_id = self.get_calendar_id()
            
            events_result = self.service.events().list(
                calendarId=calendar_id,
                timeMin=start_time.isoformat(),
                timeMax=end_time.isoformat(),
                singleEvents=True,
                orderBy='startTime'
            ).execute()
            
            events = events_result.get('items', [])
            return len(events) == 0  # True if no conflicting events
            
        except Exception as e:
            print(f"Error checking availability: {e}")
            return False
    
    def create_event(self, title: str, start_time: datetime, end_time: datetime, description: str = ""):
        """Create a calendar event"""
        try:
            calendar_id = self.get_calendar_id()
            
            event = {
                'summary': title,
                'description': description,
                'start': {
                    'dateTime': start_time.isoformat(),
                    'timeZone': 'UTC',
                },
                'end': {
                    'dateTime': end_time.isoformat(),
                    'timeZone': 'UTC',
                },
            }
            
            event_result = self.service.events().insert(
                calendarId=calendar_id,
                body=event
            ).execute()
            
            return event_result
            
        except Exception as e:
            print(f"Error creating event: {e}")
            return None
    
    def suggest_time_slots(self, preferred_date: datetime, duration_hours: int = 1):
        """Suggest available time slots for a given date"""
        try:
            # Define business hours (9 AM to 5 PM)
            start_of_day = preferred_date.replace(hour=9, minute=0, second=0, microsecond=0)
            end_of_day = preferred_date.replace(hour=17, minute=0, second=0, microsecond=0)
            
            suggestions = []
            current_time = start_of_day
            
            while current_time + timedelta(hours=duration_hours) <= end_of_day:
                end_time = current_time + timedelta(hours=duration_hours)
                
                if self.check_availability(current_time, end_time):
                    suggestions.append({
                        'start': current_time.isoformat(),
                        'end': end_time.isoformat(),
                        'display': f"{current_time.strftime('%I:%M %p')} - {end_time.strftime('%I:%M %p')}"
                    })
                
                current_time += timedelta(hours=1)
                
                if len(suggestions) >= 3:  # Limit to 3 suggestions
                    break
            
            return suggestions
            
        except Exception as e:
            print(f"Error suggesting time slots: {e}")
            return []

# Initialize services
calendar_service = GoogleCalendarService()
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# LangGraph State
class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
    booking_context: Dict[str, Any]

# Tools for the agent
@tool
def check_calendar_availability(start_time: str, end_time: str) -> str:
    """Check if a time slot is available in the calendar.
    
    Args:
        start_time: ISO format datetime string (e.g., '2024-01-15T14:00:00')
        end_time: ISO format datetime string (e.g., '2024-01-15T15:00:00')
    """
    try:
        start_dt = datetime.fromisoformat(start_time.replace('Z', '+00:00'))
        end_dt = datetime.fromisoformat(end_time.replace('Z', '+00:00'))
        
        is_available = calendar_service.check_availability(start_dt, end_dt)
        
        if is_available:
            return f"Time slot from {start_dt.strftime('%Y-%m-%d %I:%M %p')} to {end_dt.strftime('%I:%M %p')} is AVAILABLE"
        else:
            return f"Time slot from {start_dt.strftime('%Y-%m-%d %I:%M %p')} to {end_dt.strftime('%I:%M %p')} is NOT AVAILABLE (conflict found)"
    except Exception as e:
        return f"Error checking availability: {str(e)}"

@tool
def suggest_available_slots(date: str, duration_hours: int = 1) -> str:
    """Suggest available time slots for a specific date.
    
    Args:
        date: Date in YYYY-MM-DD format (e.g., '2024-01-15')
        duration_hours: Duration of the appointment in hours (default: 1)
    """
    try:
        target_date = datetime.strptime(date, '%Y-%m-%d')
        suggestions = calendar_service.suggest_time_slots(target_date, duration_hours)
        
        if suggestions:
            slots_text = "\n".join([f"• {slot['display']}" for slot in suggestions])
            return f"Available time slots for {date}:\n{slots_text}"
        else:
            return f"No available slots found for {date}. Please try another date."
    except Exception as e:
        return f"Error suggesting slots: {str(e)}"

@tool
def book_appointment(title: str, start_time: str, end_time: str, description: str = "") -> str:
    """Book an appointment in the calendar.
    
    Args:
        title: Title/subject of the appointment
        start_time: ISO format datetime string
        end_time: ISO format datetime string
        description: Optional description of the appointment
    """
    try:
        start_dt = datetime.fromisoformat(start_time.replace('Z', '+00:00'))
        end_dt = datetime.fromisoformat(end_time.replace('Z', '+00:00'))
        
        # Check availability first
        if not calendar_service.check_availability(start_dt, end_dt):
            return "Cannot book appointment: Time slot is no longer available"
        
        # Create the event
        event_result = calendar_service.create_event(title, start_dt, end_dt, description)
        
        if event_result:
            return f"✅ Appointment successfully booked!\nTitle: {title}\nTime: {start_dt.strftime('%Y-%m-%d %I:%M %p')} - {end_dt.strftime('%I:%M %p')}\nEvent ID: {event_result.get('id', 'N/A')}"
        else:
            return "Failed to book appointment. Please try again."
    except Exception as e:
        return f"Error booking appointment: {str(e)}"

# Agent tools list
tools = [check_calendar_availability, suggest_available_slots, book_appointment]

# LangGraph Agent
def create_agent():
    # System prompt for the booking agent
    system_prompt = """You are a helpful calendar booking assistant. Your job is to help users book appointments on their Google Calendar through natural conversation.

Key capabilities:
1. Check calendar availability for specific time slots
2. Suggest available time slots for a given date
3. Book appointments when the user confirms details

Guidelines:
- Be conversational and friendly
- Always check availability before booking
- Ask for clarification when appointment details are unclear
- Confirm all details (title, date, time, duration) before booking
- Suggest alternative times if requested slot is unavailable
- Use the tools available to you for calendar operations

When a user wants to book an appointment:
1. Gather: title/subject, preferred date, preferred time, duration
2. Check availability or suggest slots
3. Confirm details with user
4. Book the appointment

Current date/time context: Use ISO format for dates (YYYY-MM-DD) and times."""

    def agent_node(state: AgentState):
        messages = state["messages"]
        
        # Add system message if it's the first message
        if len(messages) == 1:
            system_message = AIMessage(content="Hello! I'm your calendar booking assistant. I can help you check availability and book appointments. What would you like to schedule?")
            messages = [system_message] + messages
        
        # Bind tools to the LLM
        llm_with_tools = llm.bind_tools(tools)
        
        # Get response from LLM
        response = llm_with_tools.invoke(messages)
        
        return {"messages": [response]}
    
    def tool_node(state: AgentState):
        messages = state["messages"]
        last_message = messages[-1]
        
        # Execute tool calls
        tool_results = []
        if hasattr(last_message, 'tool_calls') and last_message.tool_calls:
            for tool_call in last_message.tool_calls:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                
                # Find and execute the tool
                for tool in tools:
                    if tool.name == tool_name:
                        try:
                            result = tool.invoke(tool_args)
                            tool_results.append({
                                "tool_call_id": tool_call["id"],
                                "name": tool_name,
                                "content": result
                            })
                        except Exception as e:
                            tool_results.append({
                                "tool_call_id": tool_call["id"],
                                "name": tool_name,
                                "content": f"Error: {str(e)}"
                            })
                        break
        
        # Create tool messages
        tool_messages = []
        for result in tool_results:
            from langchain_core.messages import ToolMessage
            tool_messages.append(ToolMessage(
                content=result["content"],
                tool_call_id=result["tool_call_id"]
            ))
        
        return {"messages": tool_messages}
    
    def should_continue(state: AgentState):
        messages = state["messages"]
        last_message = messages[-1]
        
        # If the last message has tool calls, continue to tool node
        if hasattr(last_message, 'tool_calls') and last_message.tool_calls:
            return "tools"
        # Otherwise, end
        return END
    
    # Create the graph
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("agent", agent_node)
    workflow.add_node("tools", tool_node)
    
    # Set entry point
    workflow.set_entry_point("agent")
    
    # Add edges
    workflow.add_conditional_edges("agent", should_continue)
    workflow.add_edge("tools", "agent")
    
    return workflow.compile()

# Initialize the agent
agent = create_agent()

# Session storage (in production, use a proper database)
sessions = {}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        session_id = request.session_id
        
        # Initialize session if it doesn't exist
        if session_id not in sessions:
            sessions[session_id] = {
                "messages": [],
                "booking_context": {}
            }
        
        # Get current state
        current_state = sessions[session_id]
        
        # Add user message
        user_message = HumanMessage(content=request.message)
        current_state["messages"].append(user_message)
        
        # Prepare state for agent
        agent_state = AgentState(
            messages=current_state["messages"],
            booking_context=current_state["booking_context"]
        )
        
        # Run the agent
        result = agent.invoke(agent_state)
        
        # Get the final response
        final_message = result["messages"][-1]
        response_content = final_message.content
        
        # Update session
        sessions[session_id]["messages"] = result["messages"]
        sessions[session_id]["booking_context"] = result.get("booking_context", {})
        
        # Check if a booking was made
        booking_made = "successfully booked" in response_content.lower()
        booking_details = None
        
        if booking_made:
            # Extract booking details from response (simplified)
            booking_details = {
                "status": "confirmed",
                "message": response_content
            }
        
        return ChatResponse(
            response=response_content,
            booking_made=booking_made,
            booking_details=booking_details
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "calendar_service": calendar_service.service is not None}

@app.get("/")
async def root():
    return {"message": "Calendar Booking Agent API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)