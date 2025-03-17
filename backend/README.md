# Exhibition Platform Backend

A FastAPI backend service for the Exhibition Platform that provides data for art exhibitions, handles artist registrations, and manages content.

## Features

- RESTful API for art exhibitions and archive data
- Artist registration with Google Sheets integration
- JWT-based authentication for admin functionality
- JSON file storage for exhibition data
- Comprehensive data validation with Pydantic models

## Setup and Installation

### Prerequisites

- Python 3.11+
- Google Sheets API credentials (for artist registrations)

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/exhibition-platform.git
cd exhibition-platform/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up Google Sheets API:
   - Create a project in Google Cloud Platform
   - Enable Google Sheets API
   - Create a service account and download the credentials JSON file
   - Place the credentials file in `backend/credentials/`
   - Share your Google Sheet with the service account email

5. Create a `.env` file with the following configuration:
```
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000
GOOGLE_CREDENTIALS_FILE=credentials/google-service-account.json
REGISTRATION_SHEET_ID=your_google_sheet_id
REGISTRATION_WORKSHEET=Registrations
SECRET_KEY=your-secret-key-for-jwt-tokens
```

6. Run the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000.

### Docker Setup

1. Build the Docker image:
```bash
docker build -t exhibition-backend .
```

2. Run the container:
```bash
docker run -p 8000:8000 -v $(pwd)/data:/app/data -v $(pwd)/credentials:/app/credentials exhibition-backend
```

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/exhibitions` - Get all exhibitions
- `GET /api/exhibitions/featured` - Get featured exhibitions
- `GET /api/exhibitions/{exhibition_id}` - Get a specific exhibition
- `GET /api/archive` - Get all archived exhibitions
- `GET /api/archive/{exhibition_id}` - Get a specific archived exhibition
- `POST /api/open-call/register` - Submit an artist registration

### Admin Endpoints (Requires Authentication)

- `POST /api/admin/token` - Authenticate and get access token
- `GET /api/admin/registrations` - Get all artist registrations
- `GET /api/admin/exhibitions` - Get all exhibitions (admin view)
- `POST /api/admin/exhibitions` - Create a new exhibition
- `PUT /api/admin/exhibitions/{exhibition_id}` - Update an exhibition
- `DELETE /api/admin/exhibitions/{exhibition_id}` - Delete an exhibition

## Testing

Run tests using pytest:

```bash
pytest
```

## Deployment

The application is containerized and can be deployed to any Docker-compatible environment.

For production deployments, make sure to:
- Use a secure SECRET_KEY
- Set ENVIRONMENT=production
- Configure proper CORS_ORIGINS
- Use proper SSL/TLS encryption

## License

This project is licensed under the MIT License - see the LICENSE file for details. 