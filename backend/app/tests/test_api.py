import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_get_exhibitions():
    """Test getting exhibitions endpoint"""
    response = client.get("/api/exhibitions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_featured_exhibitions():
    """Test getting featured exhibitions endpoint"""
    response = client.get("/api/exhibitions/featured")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_archived_exhibitions():
    """Test getting archived exhibitions endpoint"""
    response = client.get("/api/archive")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_admin_auth_required():
    """Test that admin endpoints require authentication"""
    response = client.get("/api/admin/exhibitions")
    assert response.status_code == 401  # Unauthorized 