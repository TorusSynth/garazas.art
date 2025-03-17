import os
import json
from typing import Dict, List, Any, Optional
import aiofiles
from fastapi import HTTPException

from app.config import settings
from app.models.exhibition import Exhibition


class JSONStorageService:
    """Service for storing and retrieving data in JSON files"""
    
    def __init__(self):
        """Initialize the service and ensure data directories exist"""
        os.makedirs(settings.EXHIBITIONS_DIR, exist_ok=True)
    
    async def get_exhibition(self, exhibition_id: str) -> Optional[Exhibition]:
        """Get an exhibition by ID"""
        file_path = os.path.join(settings.EXHIBITIONS_DIR, f"{exhibition_id}.json")
        
        if not os.path.exists(file_path):
            return None
        
        try:
            async with aiofiles.open(file_path, mode='r') as f:
                content = await f.read()
                data = json.loads(content)
                return Exhibition(**data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error reading exhibition: {str(e)}")
    
    async def get_all_exhibitions(self, archived: Optional[bool] = None) -> List[Exhibition]:
        """Get all exhibitions, optionally filtered by archived status"""
        exhibitions = []
        
        for filename in os.listdir(settings.EXHIBITIONS_DIR):
            if filename.endswith('.json'):
                file_path = os.path.join(settings.EXHIBITIONS_DIR, filename)
                try:
                    async with aiofiles.open(file_path, mode='r') as f:
                        content = await f.read()
                        data = json.loads(content)
                        exhibition = Exhibition(**data)
                        
                        # Filter by archived status if specified
                        if archived is not None and exhibition.is_archived != archived:
                            continue
                            
                        exhibitions.append(exhibition)
                except Exception as e:
                    # Log error but continue processing other files
                    print(f"Error processing {filename}: {str(e)}")
        
        return exhibitions
    
    async def get_featured_exhibitions(self) -> List[Exhibition]:
        """Get featured exhibitions for the homepage"""
        exhibitions = await self.get_all_exhibitions(archived=False)
        return [ex for ex in exhibitions if ex.is_featured]
    
    async def save_exhibition(self, exhibition: Exhibition) -> Exhibition:
        """Save an exhibition to a JSON file"""
        file_path = os.path.join(settings.EXHIBITIONS_DIR, f"{exhibition.id}.json")
        
        try:
            async with aiofiles.open(file_path, mode='w') as f:
                await f.write(exhibition.json(indent=2))
            return exhibition
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error saving exhibition: {str(e)}")
    
    async def delete_exhibition(self, exhibition_id: str) -> bool:
        """Delete an exhibition"""
        file_path = os.path.join(settings.EXHIBITIONS_DIR, f"{exhibition_id}.json")
        
        if not os.path.exists(file_path):
            return False
        
        try:
            os.remove(file_path)
            return True
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error deleting exhibition: {str(e)}")


# Initialize the service as a singleton
json_storage_service = JSONStorageService() 