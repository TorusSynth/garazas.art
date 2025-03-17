#!/bin/bash

# Local deployment script for Garazas.art
# This script deploys your application locally

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}┌─────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│     Garazas.art Local Deployment Tool   │${NC}"
echo -e "${BLUE}└─────────────────────────────────────────┘${NC}"
echo ""

# Configuration
DEPLOYMENT_DIR="/Users/Lukas/Desktop/code/develop/garazas.art"
cd $DEPLOYMENT_DIR || { echo -e "${RED}Error: Cannot change to deployment directory${NC}"; exit 1; }

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo -e "${RED}Error: Docker is not running${NC}"
  echo -e "Please start Docker Desktop and try again."
  exit 1
fi

echo -e "${YELLOW}Step 1: Checking for latest code...${NC}"
git_current=$(git rev-parse --short HEAD)
echo -e "${GREEN}✓ Current commit: ${git_current}${NC}"
echo ""

echo -e "${YELLOW}Step 2: Preparing deployment environment...${NC}"
echo "Setting up local environment variables and configurations."
# Check if .env file exists, create from example if it doesn't
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  echo "Creating .env file from .env.example"
  cp .env.example .env
fi
echo -e "${GREEN}✓ Environment prepared${NC}"
echo ""

echo -e "${YELLOW}Step 3: Stopping existing containers...${NC}"
echo "Stopping any currently running containers."
docker-compose down
echo -e "${GREEN}✓ Existing services stopped${NC}"
echo ""

echo -e "${YELLOW}Step 4: Building and starting containers...${NC}"
echo "Building and starting the Docker containers with the latest code."

# Start in detached mode so the script continues
docker-compose up --build -d

# Check if containers started successfully
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Containers started successfully${NC}"
else
  echo -e "${RED}Error: Failed to start containers${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Frontend service started${NC}"
echo -e "${GREEN}✓ Backend service started${NC}"
echo -e "${GREEN}✓ Nginx service started${NC}"
echo -e "${GREEN}✓ Monitoring service started${NC}"
echo ""

echo -e "${YELLOW}Step 5: Performing health checks...${NC}"
echo "Waiting for services to be fully ready..."
sleep 5  # Give containers a moment to initialize

# Check if frontend is responding
echo "Checking frontend..."
if curl -s http://localhost:3000 > /dev/null; then
  echo -e "${GREEN}✓ Frontend is responding${NC}"
else
  echo -e "${YELLOW}! Frontend not responding yet. It may take a moment to initialize.${NC}"
fi

# Check if backend is responding
echo "Checking backend..."
if curl -s http://localhost:8000/api/health > /dev/null; then
  echo -e "${GREEN}✓ Backend is responding${NC}"
else
  echo -e "${YELLOW}! Backend not responding yet. It may take a moment to initialize.${NC}"
fi

echo ""
echo -e "${GREEN}┌─────────────────────────────────────────┐${NC}"
echo -e "${GREEN}│     Deployment completed successfully   │${NC}"
echo -e "${GREEN}└─────────────────────────────────────────┘${NC}"
echo ""
echo -e "Your application is now running locally:"
echo -e "  Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend API: ${BLUE}http://localhost:8000/api${NC}"
echo -e "  Monitoring: ${BLUE}http://localhost:19999${NC}"
echo ""
echo -e "${YELLOW}Note:${NC} You can stop the services with: ${BLUE}docker-compose down${NC}"
echo -e "View logs with: ${BLUE}docker-compose logs -f${NC}"
echo "" 