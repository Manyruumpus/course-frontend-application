#!/usr/bin/env python3
"""
Test script to verify the calendar booking assistant setup.
Run this to check if all dependencies and configurations are working.
"""

import os
import sys
from datetime import datetime
import json

def test_imports():
    """Test if all required packages can be imported."""
    print("🔍 Testing package imports...")
    
    try:
        import fastapi
        print("✅ FastAPI imported successfully")
    except ImportError as e:
        print(f"❌ FastAPI import failed: {e}")
        return False
    
    try:
        import streamlit
        print("✅ Streamlit imported successfully")
    except ImportError as e:
        print(f"❌ Streamlit import failed: {e}")
        return False
    
    try:
        import langchain
        import langgraph
        print("✅ LangChain/LangGraph imported successfully")
    except ImportError as e:
        print(f"❌ LangChain/LangGraph import failed: {e}")
        return False
    
    try:
        from google.oauth2.service_account import Credentials
        from googleapiclient.discovery import build
        print("✅ Google API client imported successfully")
    except ImportError as e:
        print(f"❌ Google API client import failed: {e}")
        return False
    
    try:
        from langchain_deepseek import ChatDeepSeek
        print("✅ DeepSeek/LangChain DeepSeek imported successfully")
    except ImportError as e:
        print(f"❌ DeepSeek import failed: {e}")
        return False
    
    return True

def test_environment():
    """Test environment configuration."""
    print("\n🔍 Testing environment configuration...")
    
    # Check for .env file
    if os.path.exists('.env'):
        print("✅ .env file found")
        from dotenv import load_dotenv
        load_dotenv()
    else:
        print("⚠️  .env file not found (using environment variables)")
    
    # Check DeepSeek API key
    deepseek_key = os.getenv('DEEPSEEK_API_KEY')
    if deepseek_key:
        print("✅ DeepSeek API key configured")
    else:
        print("❌ DeepSeek API key not found")
        return False
    
    # Check Google service account
    service_file = os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE')
    service_json = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')
    
    if service_file and os.path.exists(service_file):
        print("✅ Google service account file found")
    elif service_json:
        try:
            json.loads(service_json)
            print("✅ Google service account JSON configured")
        except json.JSONDecodeError:
            print("❌ Invalid Google service account JSON")
            return False
    else:
        print("❌ Google service account credentials not found")
        return False
    
    return True

def test_google_calendar():
    """Test Google Calendar connection."""
    print("\n🔍 Testing Google Calendar connection...")
    
    try:
        from google.oauth2.service_account import Credentials
        from googleapiclient.discovery import build
        
        # Load credentials
        service_file = os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE')
        service_json = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')
        
        if service_file and os.path.exists(service_file):
            credentials = Credentials.from_service_account_file(
                service_file,
                scopes=['https://www.googleapis.com/auth/calendar']
            )
        elif service_json:
            creds_info = json.loads(service_json)
            credentials = Credentials.from_service_account_info(
                creds_info,
                scopes=['https://www.googleapis.com/auth/calendar']
            )
        else:
            print("❌ No Google credentials available")
            return False
        
        # Build service
        service = build('calendar', 'v3', credentials=credentials)
        
        # Test connection by getting calendar list
        calendar_id = os.getenv('GOOGLE_CALENDAR_ID', 'primary')
        calendar = service.calendars().get(calendarId=calendar_id).execute()
        
        print(f"✅ Connected to calendar: {calendar.get('summary', 'Unknown')}")
        return True
        
    except Exception as e:
        print(f"❌ Google Calendar connection failed: {e}")
        return False

def test_deepseek():
    """Test DeepSeek connection."""
    print("\n🔍 Testing DeepSeek connection...")
    
    try:
        from langchain_deepseek import ChatDeepSeek
        
        llm = ChatDeepSeek(model="deepseek-chat", temperature=0)
        response = llm.invoke("Hello, this is a test. Please respond with 'Test successful!'")
        
        if "test successful" in response.content.lower():
            print("✅ DeepSeek connection successful")
            return True
        else:
            print(f"⚠️  DeepSeek responded but with unexpected content: {response.content}")
            return True  # Still working, just unexpected response
            
    except Exception as e:
        print(f"❌ DeepSeek connection failed: {e}")
        return False

def main():
    """Run all tests."""
    print("🚀 Calendar Booking Assistant - Setup Test\n")
    
    all_passed = True
    
    # Test imports
    if not test_imports():
        all_passed = False
    
    # Test environment
    if not test_environment():
        all_passed = False
    
    # Test Google Calendar (only if environment is configured)
    if os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE') or os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON'):
        if not test_google_calendar():
            all_passed = False
    else:
        print("\n⚠️  Skipping Google Calendar test - credentials not configured")
    
    # Test DeepSeek (only if key is configured)
    if os.getenv('DEEPSEEK_API_KEY'):
        if not test_deepseek():
            all_passed = False
    else:
        print("\n⚠️  Skipping DeepSeek test - API key not configured")
    
    # Summary
    print("\n" + "="*50)
    if all_passed:
        print("🎉 All tests passed! Your setup is ready to go.")
        print("\nNext steps:")
        print("1. Start the backend: cd backend && python main.py")
        print("2. Start the frontend: cd frontend && streamlit run streamlit_app.py")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        print("\nCommon solutions:")
        print("1. Install missing packages: pip install -r requirements.txt")
        print("2. Set up environment variables in .env file")
        print("3. Configure Google Service Account credentials")
        print("4. Set up DeepSeek API key")
    
    return all_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)