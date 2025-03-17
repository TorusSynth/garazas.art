from fastapi import APIRouter, HTTPException, Query
from typing import List

from app.models.exhibition import Exhibition
from app.services.json_storage import json_storage_service

router = APIRouter()


@router.get("/", response_model=List[Exhibition])
async def get_archived_exhibitions():
    """
    Get all archived exhibitions
    """
    return await json_storage_service.get_all_exhibitions(archived=True)


@router.get("/{exhibition_id}", response_model=Exhibition)
async def get_archived_exhibition(exhibition_id: str):
    """
    Get a specific archived exhibition by ID
    """
    exhibition = await json_storage_service.get_exhibition(exhibition_id)
    
    if not exhibition:
        raise HTTPException(status_code=404, detail="Exhibition not found")
    
    if not exhibition.is_archived:
        raise HTTPException(status_code=404, detail="Exhibition is not archived")
    
    return exhibition 