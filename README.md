This is the native react and tailwind frontend without interating any intergeration with backend or adding any button 

this is before i integrated any backend to the frontend 


the one with backend will be in the different repo

## Calendar Booking Assistant

This project contains a FastAPI backend powered by LangChain and a Streamlit frontend that together let a conversational AI agent schedule meetings on your Google Calendar.

### 1. Local Setup

```bash
# Clone repo
pip install -r requirements.txt

# Create `.env`
OPENAI_API_KEY=<your-openai-key>
GOOGLE_SERVICE_ACCOUNT_FILE=service_account.json
GOOGLE_CALENDAR_ID=primary  # or the id of a specific calendar
BACKEND_URL=http://localhost:8000  # used by Streamlit frontend
```

Start backend:

```bash
uvicorn backend.main:app --reload --port 8000
```

Start frontend:

```bash
streamlit run frontend/app.py
```

### 2. Service Account Setup

1. In Google Cloud Console create a **Service Account**.
2. Enable the **Google Calendar API**.
3. Generate a JSON key and save it as `service_account.json` (or any path you reference in `GOOGLE_SERVICE_ACCOUNT_FILE`).
4. Share the target Google Calendar with the service account's email and give **Make changes to events** permission.

### 3. Deployment

The app can be deployed on Railway / Render:

1. Set environment variables mentioned above.
2. Configure a **web service** that runs `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`.
3. Add another **static site** or **web service** for the Streamlit frontend: `streamlit run frontend/app.py --server.port $PORT`.

### 4. Usage

Open the Streamlit URL and chat with the bot:

```
👤: Can you book a 30-minute meeting for next Tuesday afternoon?
🤖: I found these times free on 2025-07-08:
 • 14:00–14:30
 • 15:00–15:30
Which one works for you?
...
```
