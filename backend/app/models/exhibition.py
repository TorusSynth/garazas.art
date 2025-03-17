from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from datetime import date


class Artist(BaseModel):
    """Schema for an artist participating in an exhibition"""
    name: str = Field(..., description="Artist's name")
    bio: Optional[str] = Field(None, description="Artist's biography")
    website: Optional[HttpUrl] = Field(None, description="Artist's website")


class Artwork(BaseModel):
    """Schema for an artwork in an exhibition"""
    title: str = Field(..., description="Artwork title")
    year: Optional[int] = Field(None, description="Year created")
    medium: Optional[str] = Field(None, description="Artwork medium")
    dimensions: Optional[str] = Field(None, description="Artwork dimensions")
    description: Optional[str] = Field(None, description="Artwork description")
    image_url: Optional[HttpUrl] = Field(None, description="URL to artwork image")


class Exhibition(BaseModel):
    """Schema for an exhibition"""
    id: str = Field(..., description="Unique exhibition ID")
    title: str = Field(..., description="Exhibition title")
    description: str = Field(..., description="Exhibition description")
    start_date: date = Field(..., description="Exhibition start date")
    end_date: date = Field(..., description="Exhibition end date")
    location: str = Field(..., description="Exhibition location")
    curator: Optional[str] = Field(None, description="Exhibition curator")
    artists: List[Artist] = Field(default=[], description="Participating artists")
    artworks: List[Artwork] = Field(default=[], description="Exhibited artworks")
    featured_image_url: Optional[HttpUrl] = Field(None, description="URL to featured image")
    is_featured: bool = Field(False, description="Whether exhibition is featured on homepage")
    is_archived: bool = Field(False, description="Whether exhibition is archived") 