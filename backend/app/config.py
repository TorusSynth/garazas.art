import os
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    # App settings
    APP_NAME: str = "Exhibition Platform API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # CORS settings
    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    
    # Google Sheets settings
    GOOGLE_CREDENTIALS_FILE: str = os.getenv("GOOGLE_CREDENTIALS_FILE", "credentials/google-service-account.json")
    REGISTRATION_SHEET_ID: str = os.getenv("REGISTRATION_SHEET_ID", "")
    REGISTRATION_WORKSHEET: str = os.getenv("REGISTRATION_WORKSHEET", "Registrations")
    
    # Data storage settings
    DATA_DIR: str = os.getenv("DATA_DIR", "data")
    EXHIBITIONS_DIR: str = os.path.join(DATA_DIR, "exhibitions")
    
    # Secret key for tokens
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-for-development-only")
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings() 