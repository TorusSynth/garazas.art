import os
from typing import Dict, List, Any
import gspread
from google.oauth2.service_account import Credentials
from pydantic import BaseModel

from app.config import settings
from app.models.registration import ArtistRegistration

class GoogleSheetsService:
    def __init__(self):
        # Set up credentials for Google Sheets API
        scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ]
        
        credentials = Credentials.from_service_account_file(
            settings.GOOGLE_CREDENTIALS_FILE,
            scopes=scopes
        )
        
        self.client = gspread.authorize(credentials)
        self.sheet = self.client.open_by_key(settings.REGISTRATION_SHEET_ID)
        self.worksheet = self.sheet.worksheet(settings.REGISTRATION_WORKSHEET)
        
    async def add_registration(self, registration: ArtistRegistration) -> Dict[str, Any]:
        """Add an artist registration to the Google Sheet"""
        # Convert the registration data to a row format
        row = [
            registration.name,
            registration.email,
            registration.website or "",
            registration.artist_statement,
            ", ".join(registration.work_sample_urls) if registration.work_sample_urls else "",
            registration.submitted_at.isoformat()
        ]
        
        # Append the row to the worksheet
        self.worksheet.append_row(row)
        
        return {"success": True, "id": registration.id}
    
    async def get_registrations(self) -> List[Dict[str, Any]]:
        """Get all artist registrations from the Google Sheet"""
        # Get all records from the worksheet
        records = self.worksheet.get_all_records()
        
        return records

# Initialize the service as a singleton
google_sheets_service = GoogleSheetsService() 