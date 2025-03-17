from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.models.exhibition import Exhibition
from app.services.json_storage import json_storage_service

router = APIRouter()


@router.get("/", response_model=List[Exhibition])
async def get_exhibitions(
    archived: Optional[bool] = Query(None, description="Filter by archived status")
):
    """
    Get all exhibitions, optionally filtered by archived status
    """
    return await json_storage_service.get_all_exhibitions(archived=archived)


@router.get("/featured", response_model=List[Exhibition])
async def get_featured_exhibitions():
    """
    Get featured exhibitions for the homepage
    """
    return await json_storage_service.get_featured_exhibitions()


@router.get("/{exhibition_id}", response_model=Exhibition)
async def get_exhibition(exhibition_id: str):
    """
    Get a specific exhibition by ID
    """
    exhibition = await json_storage_service.get_exhibition(exhibition_id)
    
    if not exhibition:
        raise HTTPException(status_code=404, detail="Exhibition not found")
    
    return exhibition 