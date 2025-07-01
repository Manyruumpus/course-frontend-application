import os
import datetime as dt
from typing import List, Tuple

from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/calendar"]

# Expect env vars
SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE")
CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID")  # e.g. primary or specific id


class CalendarService:
    """Singleton wrapper around Google Calendar service built from service account."""

    _service = None

    @classmethod
    def get_service(cls):
        if cls._service is None:
            if not SERVICE_ACCOUNT_FILE or not os.path.exists(SERVICE_ACCOUNT_FILE):
                raise FileNotFoundError(
                    "GOOGLE_SERVICE_ACCOUNT_FILE env variable missing or file not found."
                )
            creds = service_account.Credentials.from_service_account_file(
                SERVICE_ACCOUNT_FILE, scopes=SCOPES
            )
            cls._service = build("calendar", "v3", credentials=creds, cache_discovery=False)
        return cls._service


# ------------------------ Core Calendar Operations ------------------------ #


def list_events(time_min: dt.datetime, time_max: dt.datetime):
    """Return list of events between time_min and time_max."""
    service = CalendarService.get_service()
    events_result = (
        service.events()
        .list(
            calendarId=CALENDAR_ID,
            timeMin=time_min.isoformat() + "Z",  # Z indicates UTC time
            timeMax=time_max.isoformat() + "Z",
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    return events_result.get("items", [])


def is_slot_free(start: dt.datetime, end: dt.datetime) -> bool:
    """Check if time slot is free by querying events."""
    events = list_events(start, end)
    return len(events) == 0


def create_event(
    summary: str,
    description: str,
    start: dt.datetime,
    end: dt.datetime,
    timezone: str = "UTC",
    attendees: List[str] | None = None,
):
    service = CalendarService.get_service()
    event_body = {
        "summary": summary,
        "description": description,
        "start": {"dateTime": start.isoformat(), "timeZone": timezone},
        "end": {"dateTime": end.isoformat(), "timeZone": timezone},
    }
    if attendees:
        event_body["attendees"] = [{"email": email} for email in attendees]

    created_event = (
        service.events().insert(calendarId=CALENDAR_ID, body=event_body).execute()
    )
    return created_event


# ------------------------ Scheduling helpers ------------------------ #


def find_free_slots(
    date: dt.date,
    duration_minutes: int = 30,
    work_start_hour: int = 9,
    work_end_hour: int = 18,
    timezone: str = "UTC",
) -> List[Tuple[dt.datetime, dt.datetime]]:
    """Find free slots of given duration on specific date."""
    tzinfo = dt.timezone.utc if timezone.upper() == "UTC" else dt.timezone.utc  # placeholder

    start_of_day = dt.datetime.combine(date, dt.time(hour=work_start_hour), tzinfo=tzinfo)
    end_of_day = dt.datetime.combine(date, dt.time(hour=work_end_hour), tzinfo=tzinfo)

    # Retrieve events during day
    events = list_events(start_of_day, end_of_day)

    # Build occupied intervals
    occupied = []
    for event in events:
        start_str = event["start"].get("dateTime") or event["start"].get("date")
        end_str = event["end"].get("dateTime") or event["end"].get("date")
        occupied.append(
            (
                dt.datetime.fromisoformat(start_str.replace("Z", "+00:00")),
                dt.datetime.fromisoformat(end_str.replace("Z", "+00:00")),
            )
        )

    # Sort intervals
    occupied.sort(key=lambda x: x[0])

    current = start_of_day
    free_slots = []
    delta = dt.timedelta(minutes=duration_minutes)

    for start_busy, end_busy in occupied:
        if current + delta <= start_busy:
            # Free slot found
            free_slots.append((current, start_busy))
        current = max(current, end_busy)

    if current + delta <= end_of_day:
        free_slots.append((current, end_of_day))

    # Filter slots shorter than duration
    valid_slots = []
    for slot_start, slot_end in free_slots:
        while slot_start + delta <= slot_end:
            valid_slots.append((slot_start, slot_start + delta))
            slot_start += delta

    return valid_slots