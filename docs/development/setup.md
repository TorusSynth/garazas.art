# Development Setup Guide

This guide provides detailed instructions for setting up the Garazas.art development environment.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
  - [Docker Installation Guide](https://docs.docker.com/get-docker/)
  - [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

- **Git** (v2.25+)
  - [Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- **Node.js** (v18+) and **npm** (for frontend local development without Docker)
  - [Node.js Installation Guide](https://nodejs.org/en/download/)

- **Python** (v3.11+) (for backend local development without Docker)
  - [Python Installation Guide](https://www.python.org/downloads/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/garazas.art.git
cd garazas.art
```

## Step 2: Set Up Google Sheets API (Required for Backend)

The backend uses Google Sheets API for storing open call artist registrations.

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Sheets API and Drive API

2. **Create Service Account Credentials**:
   - In your Google Cloud project, navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the service account details
   - Grant the service account access to your project (Role: Editor)
   - Create a key (JSON format) for the service account
   - Download the JSON key file

3. **Set Up Google Sheet**:
   - Create a new Google Sheet
   - Share the sheet with the email address of your service account (with Editor permissions)
   - Create a worksheet named "Registrations" (or use a different name and update the configuration)

4. **Place the Service Account Credentials**:
   ```bash
   mkdir -p backend/credentials
   # Copy your downloaded JSON key file to:
   cp path/to/your-credentials.json backend/credentials/google-service-account.json
   ```

## Step 3: Run the Setup Script

The setup script creates necessary directories and configuration files:

```bash
./setup.sh
```

## Step 4: Configure Environment Variables

Copy the example environment file and edit it with your settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```ini
# Required for backend
REGISTRATION_SHEET_ID=your-google-sheet-id  # ID from the Google Sheet URL
REGISTRATION_WORKSHEET=Registrations        # Name of the worksheet

# Development keys (don't use these in production)
SECRET_KEY=super-secret-key-for-development-only

# Optional settings
CORS_ORIGINS=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Step 5: Start the Development Environment

```bash
./start-dev.sh
```

This script will:
- Build and start all Docker containers
- Mount your local code directories into the containers
- Set up hot reloading for both frontend and backend

## Step 6: Access the Application

Once the services are running, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **API Documentation**: http://localhost:8000/docs
- **Monitoring Dashboard**: http://localhost:19999 (if Netdata is configured)

## Local Development Without Docker (Optional)

### Frontend Local Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Local Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Development Workflows

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

### Linting

```bash
# Frontend linting
cd frontend
npm run lint

# Fix linting issues
npm run lint:fix
```

## Troubleshooting Common Issues

### Docker Issues

**Problem**: Cannot connect to the Docker daemon
```
ERROR: Cannot connect to the Docker daemon at unix:///var/run/docker.sock
```

**Solution**: Make sure Docker is running:
```bash
sudo systemctl start docker
# Or on macOS:
open -a Docker
```

**Problem**: Port already in use
```
Error starting userland proxy: listen tcp 0.0.0.0:3000: bind: address already in use
```

**Solution**: Check what's using the port and stop it:
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### Backend Issues

**Problem**: Google Sheets API credentials error
```
google.auth.exceptions.DefaultCredentialsError: Could not automatically determine credentials
```

**Solution**: Make sure you've set up the credentials correctly:
- Check if `backend/credentials/google-service-account.json` exists
- Verify the file contains valid credentials
- Make sure the Google Sheet is shared with the service account email

**Problem**: Sheet not found
```
gspread.exceptions.SpreadsheetNotFound: Spreadsheet not found
```

**Solution**: Verify your Google Sheet ID:
- Check the `REGISTRATION_SHEET_ID` in your .env file
- Make sure the sheet is shared with the service account email

### Frontend Issues

**Problem**: Missing dependencies
```
Module not found: Can't resolve 'react-hook-form'
```

**Solution**: Install the missing dependency:
```bash
cd frontend
npm install react-hook-form
```

## Next Steps

Once your development environment is set up, you may want to:

1. **Explore the codebase** to understand the project structure
2. **Check out the API documentation** at http://localhost:8000/docs
3. **Review the development guidelines** in [guidelines.md](./guidelines.md)

For more detailed information about the architecture and project overview, see the main [README.md](../../README.md). 