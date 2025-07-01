import os
import requests
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

st.set_page_config(page_title="Calendar Booking Assistant")
st.title("📅 Calendar Booking Assistant")

if "session_id" not in st.session_state:
    import uuid

    st.session_state.session_id = str(uuid.uuid4())

if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])


# Chat input
if prompt := st.chat_input("How can I help you today?"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Call backend
    try:
        response = requests.post(
            f"{BACKEND_URL}/chat",
            json={"session_id": st.session_state.session_id, "message": prompt},
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        reply = data["response"]

    except Exception as e:
        reply = f"Error: {e}"

    # Display assistant response
    with st.chat_message("assistant"):
        st.markdown(reply)

    # Save assistant response
    st.session_state.messages.append({"role": "assistant", "content": reply})