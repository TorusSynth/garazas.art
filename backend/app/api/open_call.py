from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from datetime import datetime
import uuid

from app.models.registration import ArtistRegistration, RegistrationCreate
from app.services.google_sheets import google_sheets_service

router = APIRouter()

@router.post("/register", status_code=201)
async def register_artist(
    registration: RegistrationCreate,
    background_tasks: BackgroundTasks
):
    """
    Submit an artist registration for an open call
    """
    # Create a new registration object with additional metadata
    new_registration = ArtistRegistration(
        id=str(uuid.uuid4()),
        submitted_at=datetime.now(),
        status="pending",
        **registration.dict()
    )
    
    # Add the registration to Google Sheets in the background
    # This prevents API timeouts if the sheets API is slow
    background_tasks.add_task(
        google_sheets_service.add_registration,
        new_registration
    )
    
    return {
        "id": new_registration.id,
        "message": "Registration submitted successfully"
    }

@router.get("/status/{registration_id}")
async def get_registration_status(registration_id: str):
    """
    Check the status of an artist registration
    """
    # In a real app, you would look up the registration
    # For now, we'll return a mock response
    return {
        "id": registration_id,
        "status": "pending",
        "message": "Your registration is being reviewed"
    } 