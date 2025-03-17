from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from typing import Dict, Any, List
from datetime import timedelta
import uuid

from app.models.exhibition import Exhibition
from app.services.json_storage import json_storage_service
from app.services.google_sheets import google_sheets_service
from app.services.auth import authenticate_user, create_access_token, verify_admin

router = APIRouter()


@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate admin user and generate access token
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token with 30-day expiration
    access_token_expires = timedelta(days=30)
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/registrations", response_model=List[Dict[str, Any]])
async def get_all_registrations(_: Dict[str, Any] = Depends(verify_admin)):
    """
    Get all artist registrations from Google Sheets
    """
    return await google_sheets_service.get_registrations()


@router.get("/exhibitions", response_model=List[Exhibition])
async def get_all_exhibitions_admin(_: Dict[str, Any] = Depends(verify_admin)):
    """
    Get all exhibitions (admin access)
    """
    return await json_storage_service.get_all_exhibitions()


@router.post("/exhibitions", response_model=Exhibition, status_code=201)
async def create_exhibition(
    exhibition_data: Exhibition = Body(...),
    _: Dict[str, Any] = Depends(verify_admin)
):
    """
    Create a new exhibition
    """
    # Ensure the exhibition has an ID
    if not exhibition_data.id:
        exhibition_data.id = str(uuid.uuid4())
    
    # Save the exhibition
    return await json_storage_service.save_exhibition(exhibition_data)


@router.put("/exhibitions/{exhibition_id}", response_model=Exhibition)
async def update_exhibition(
    exhibition_id: str,
    exhibition_data: Exhibition = Body(...),
    _: Dict[str, Any] = Depends(verify_admin)
):
    """
    Update an existing exhibition
    """
    # Check if exhibition exists
    existing = await json_storage_service.get_exhibition(exhibition_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Exhibition not found")
    
    # Ensure ID in path matches ID in body
    if exhibition_id != exhibition_data.id:
        raise HTTPException(status_code=400, detail="Exhibition ID mismatch")
    
    # Save the updated exhibition
    return await json_storage_service.save_exhibition(exhibition_data)


@router.delete("/exhibitions/{exhibition_id}", status_code=204)
async def delete_exhibition(
    exhibition_id: str,
    _: Dict[str, Any] = Depends(verify_admin)
):
    """
    Delete an exhibition
    """
    # Check if exhibition exists
    existing = await json_storage_service.get_exhibition(exhibition_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Exhibition not found")
    
    # Delete the exhibition
    success = await json_storage_service.delete_exhibition(exhibition_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete exhibition")
    
    return None 