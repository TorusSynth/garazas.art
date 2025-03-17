from pydantic import BaseModel, Field, EmailStr, HttpUrl
from typing import List, Optional
from datetime import datetime
from uuid import UUID


class RegistrationCreate(BaseModel):
    """Schema for creating a new artist registration"""
    name: str = Field(..., min_length=2, description="Artist's full name")
    email: EmailStr = Field(..., description="Artist's email address")
    website: Optional[HttpUrl] = Field(None, description="Artist's website URL")
    artist_statement: str = Field(..., min_length=50, description="Artist's statement or bio")
    work_sample_urls: List[HttpUrl] = Field(..., min_items=1, description="URLs to work samples")


class ArtistRegistration(RegistrationCreate):
    """Schema for a complete artist registration with metadata"""
    id: str = Field(..., description="Unique registration ID")
    submitted_at: datetime = Field(..., description="Timestamp of submission")
    status: str = Field("pending", description="Registration status")


class RegistrationResponse(BaseModel):
    """Schema for registration response"""
    id: str
    message: str 