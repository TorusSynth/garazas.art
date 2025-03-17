# Garazas.art Exhibition Platform

![Garazas.art](docs/images/garazas-logo.png)

## Project Overview

Garazas.art is a full-stack application for managing and showcasing art exhibitions. It provides a platform for galleries to present their exhibitions, create an archive of past shows, and manage open calls for artists. The platform includes both the public-facing website and an admin interface for content management.

### Key Features

- **Exhibition Showcase**: Display current and upcoming exhibitions
- **Archive Management**: Maintain a searchable archive of past exhibitions
- **Artist Profiles**: Feature artists and their works
- **Open Call System**: Accept and manage artist submissions
- **Admin Dashboard**: Manage content, submissions, and exhibitions

## Architecture

Garazas.art is built using a modern, containerized architecture that consists of:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  Next.js        │      │  FastAPI        │      │  Google Sheets  │
│  Frontend       │◄────►│  Backend        │◄────►│  Data Storage   │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        △                        △
        │                        │
        ▼                        ▼
┌─────────────────────────────────────────────┐
│                                             │
│              Nginx Server                   │
│                                             │
└─────────────────────────────────────────────┘
                    △
                    │
                    ▼
┌─────────────────────────────────────────────┐
│                                             │
│               Clients                       │
│     (Web Browsers, Mobile Devices)          │
│                                             │
└─────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (styling)
- React Hook Form (form handling)

**Backend:**
- FastAPI (Python web framework)
- Pydantic (data validation)
- Google Sheets API (data storage)

**Infrastructure:**
- Docker (containerization)
- Nginx (web server and reverse proxy)
- Netdata (monitoring)

**Development Tools:**
- ESLint (JavaScript/TypeScript linting)
- Pytest (Python testing)
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- Google Sheets API credentials

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TorusSynth/garazas.art.git
   cd garazas.art
   ```

2. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit the .env file with your configuration
   ```

4. **Start the development environment:**
   ```bash
   ./start-dev.sh
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - API Documentation: http://localhost:8000/docs

For more detailed setup instructions, see [Development Setup](docs/development/setup.md).

## Development Workflow

### Code Structure

- `frontend/`: Next.js application
- `backend/`: FastAPI application
- `nginx/`: Nginx configuration
- `docs/`: Project documentation
- `monitoring/`: Netdata monitoring configuration

### Development Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and test locally**

3. **Run linters and tests:**
   ```bash
   # Frontend
   cd frontend
   npm run lint
   npm test

   # Backend
   cd backend
   pytest
   ```

4. **Submit a pull request to the main branch**

For more detailed development guidelines, see [Development Guidelines](docs/development/guidelines.md).

## Deployment

For deployment instructions, see [Deployment Guide](docs/operations/deployment.md).

## Monitoring

For information on monitoring, see [Monitoring Guide](docs/operations/monitoring.md).

## API Documentation

API documentation is available at [API Documentation](docs/api/README.md) or through the Swagger UI when running the backend locally at http://localhost:8000/docs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact info@garazas.art.
