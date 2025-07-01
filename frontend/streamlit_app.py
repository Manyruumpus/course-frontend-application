import streamlit as st
import requests
import json
from datetime import datetime
import uuid

# Configure page
st.set_page_config(
    page_title="Calendar Booking Assistant",
    page_icon="📅",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        text-align: center;
        color: #1f77b4;
        font-size: 2.5em;
        margin-bottom: 0.5em;
    }
    .chat-message {
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: flex-start;
    }
    .user-message {
        background-color: #e3f2fd;
        margin-left: 2rem;
    }
    .assistant-message {
        background-color: #f5f5f5;
        margin-right: 2rem;
    }
    .booking-success {
        background-color: #e8f5e8;
        border: 2px solid #4caf50;
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
    }
    .status-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 0.5rem;
    }
    .status-online {
        background-color: #4caf50;
    }
    .status-offline {
        background-color: #f44336;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if "messages" not in st.session_state:
    st.session_state.messages = []
if "session_id" not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if "backend_url" not in st.session_state:
    st.session_state.backend_url = st.secrets.get("BACKEND_URL", "http://localhost:8000")

# Sidebar
with st.sidebar:
    st.title("🔧 Settings")
    
    # Backend URL configuration
    backend_url = st.text_input(
        "Backend URL", 
        value=st.session_state.backend_url,
        help="URL of the FastAPI backend"
    )
    st.session_state.backend_url = backend_url
    
    # Test connection
    st.subheader("🔍 Connection Status")
    try:
        response = requests.get(f"{backend_url}/health", timeout=5)
        if response.status_code == 200:
            health_data = response.json()
            calendar_status = health_data.get("calendar_service", False)
            
            st.markdown(
                f'<span class="status-indicator status-online"></span> Backend: Online', 
                unsafe_allow_html=True
            )
            
            if calendar_status:
                st.markdown(
                    f'<span class="status-indicator status-online"></span> Calendar: Connected', 
                    unsafe_allow_html=True
                )
            else:
                st.markdown(
                    f'<span class="status-indicator status-offline"></span> Calendar: Disconnected', 
                    unsafe_allow_html=True
                )
                st.warning("Google Calendar not configured. Please check service account credentials.")
        else:
            st.markdown(
                f'<span class="status-indicator status-offline"></span> Backend: Offline', 
                unsafe_allow_html=True
            )
    except Exception as e:
        st.markdown(
            f'<span class="status-indicator status-offline"></span> Backend: Connection Error', 
            unsafe_allow_html=True
        )
        st.error(f"Connection error: {str(e)}")
    
    st.divider()
    
    # Session info
    st.subheader("📊 Session Info")
    st.text(f"Session ID: {st.session_state.session_id[:8]}...")
    st.text(f"Messages: {len(st.session_state.messages)}")
    
    # Clear conversation
    if st.button("🗑️ Clear Conversation", type="secondary"):
        st.session_state.messages = []
        st.session_state.session_id = str(uuid.uuid4())
        st.rerun()
    
    st.divider()
    
    # Instructions
    st.subheader("💡 How to Use")
    st.markdown("""
    1. **Start a conversation** by typing a message
    2. **Request an appointment** by saying something like:
       - "I need to book a meeting"
       - "Schedule an appointment for tomorrow"
       - "Check availability for Friday at 2 PM"
    3. **Provide details** when asked:
       - Meeting title/subject
       - Preferred date
       - Preferred time
       - Duration
    4. **Confirm** the booking when prompted
    
    The assistant will check your calendar availability and book appointments automatically!
    """)

# Main interface
st.markdown('<h1 class="main-header">📅 Calendar Booking Assistant</h1>', unsafe_allow_html=True)

st.markdown("""
Welcome to your AI-powered calendar booking assistant! I can help you:
- ✅ Check calendar availability
- 📋 Suggest available time slots  
- 📅 Book appointments
- 🔄 Handle rescheduling

Just start chatting below to book your next appointment!
""")

# Chat interface
st.subheader("💬 Chat")

# Display chat messages
chat_container = st.container()
with chat_container:
    for i, message in enumerate(st.session_state.messages):
        if message["role"] == "user":
            with st.chat_message("user"):
                st.write(message["content"])
        else:
            with st.chat_message("assistant"):
                st.write(message["content"])
                
                # Show booking confirmation if present
                if message.get("booking_made", False):
                    st.markdown("""
                    <div class="booking-success">
                        <h4>🎉 Booking Confirmed!</h4>
                        <p>Your appointment has been successfully added to your calendar.</p>
                    </div>
                    """, unsafe_allow_html=True)

# Chat input
def send_message():
    if st.session_state.user_input:
        user_message = st.session_state.user_input
        
        # Add user message to chat
        st.session_state.messages.append({
            "role": "user", 
            "content": user_message
        })
        
        # Send to backend
        try:
            with st.spinner("🤔 Thinking..."):
                response = requests.post(
                    f"{st.session_state.backend_url}/chat",
                    json={
                        "message": user_message,
                        "session_id": st.session_state.session_id
                    },
                    timeout=30
                )
            
            if response.status_code == 200:
                data = response.json()
                
                # Add assistant response to chat
                assistant_message = {
                    "role": "assistant",
                    "content": data["response"],
                    "booking_made": data.get("booking_made", False),
                    "booking_details": data.get("booking_details")
                }
                
                st.session_state.messages.append(assistant_message)
                
                # Show success notification for bookings
                if data.get("booking_made", False):
                    st.success("🎉 Appointment booked successfully!")
                    st.balloons()
                
            else:
                st.error(f"Error: {response.status_code} - {response.text}")
                
        except requests.exceptions.RequestException as e:
            st.error(f"Connection error: {str(e)}")
        except Exception as e:
            st.error(f"Unexpected error: {str(e)}")
        
        # Clear input
        st.session_state.user_input = ""

# Input field
st.text_input(
    "Type your message here...",
    key="user_input",
    placeholder="e.g., 'I need to book a meeting for tomorrow at 2 PM'",
    on_change=send_message,
    label_visibility="collapsed"
)

# Example prompts
st.subheader("💭 Example Prompts")
col1, col2, col3 = st.columns(3)

with col1:
    if st.button("📅 Book a meeting", key="example1"):
        st.session_state.user_input = "I need to book a meeting for tomorrow at 2 PM"
        send_message()

with col2:
    if st.button("🔍 Check availability", key="example2"):
        st.session_state.user_input = "What's my availability for this Friday?"
        send_message()

with col3:
    if st.button("⏰ Schedule appointment", key="example3"):
        st.session_state.user_input = "Schedule a 1-hour appointment for next Monday"
        send_message()

# Footer
st.divider()
st.markdown("""
<div style="text-align: center; color: #666; font-size: 0.9em;">
    <p>Powered by FastAPI, LangGraph, and Google Calendar API</p>
    <p>Built with ❤️ using Streamlit</p>
</div>
""", unsafe_allow_html=True)