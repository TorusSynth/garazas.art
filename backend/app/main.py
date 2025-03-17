from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import exhibitions, archive, open_call, admin
from app.config import settings
from app.services.auth import get_current_user

app = FastAPI(
    title="Exhibition Platform API",
    description="Backend API for the exhibition platform",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(exhibitions.router, prefix="/api/exhibitions", tags=["exhibitions"])
app.include_router(archive.router, prefix="/api/archive", tags=["archive"])
app.include_router(open_call.router, prefix="/api/open-call", tags=["open-call"])
app.include_router(
    admin.router, 
    prefix="/api/admin", 
    tags=["admin"],
    dependencies=[Depends(get_current_user)]
)

# Mount static files if needed
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/api/health", status_code=200)
async def health_check():
    """
    Health check endpoint for container monitoring.
    Returns a 200 status code if the API is running.
    """
    return {"status": "healthy", "service": "backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 