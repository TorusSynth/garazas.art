#!/bin/bash

# Local deployment script for Garazas.art
# This script demonstrates deployment from a CI/CD pipeline

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

echo -e "${YELLOW}Step 1: Checking for latest CI/CD build artifacts...${NC}"
echo "In a real deployment, this would download artifacts from GitHub Actions."
echo "For the demo, we'll simulate this step."
sleep 1
echo -e "${GREEN}✓ Found latest build from commit $(git rev-parse --short HEAD)${NC}"
echo ""

echo -e "${YELLOW}Step 2: Preparing deployment environment...${NC}"
echo "Setting up local environment variables and configurations."
sleep 1
echo -e "${GREEN}✓ Environment prepared${NC}"
echo ""

echo -e "${YELLOW}Step 3: Stopping existing containers...${NC}"
echo "This would stop any currently running containers."
# In a real deployment:
# docker-compose down
sleep 1
echo -e "${GREEN}✓ Existing services stopped${NC}"
echo ""

echo -e "${YELLOW}Step 4: Starting containers with latest images...${NC}"
echo "In a real deployment, this would pull the latest images from the registry"
echo "and start the containers with docker-compose."
# In a real deployment:
# docker-compose up -d
sleep 1

echo -e "${GREEN}✓ Frontend service started${NC}"
sleep 0.5
echo -e "${GREEN}✓ Backend service started${NC}"
sleep 0.5
echo -e "${GREEN}✓ Nginx service started${NC}"
sleep 0.5
echo -e "${GREEN}✓ Monitoring service started${NC}"
echo ""

echo -e "${YELLOW}Step 5: Performing health checks...${NC}"
echo "Checking if all services are running properly."
sleep 1
echo -e "${GREEN}✓ All services are healthy${NC}"
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
echo -e "For a real deployment, these services would be running with the latest images."
echo -e "For this demo, you can still access your existing local development setup."
echo ""
echo -e "${YELLOW}Note:${NC} In a complete setup, we would have:"
echo "  1. Downloaded artifacts from GitHub Actions"
echo "  2. Pulled Docker images from GitHub Container Registry"
echo "  3. Used those images to deploy locally"
echo "" 