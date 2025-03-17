#!/bin/bash

# Local deployment script for Garazas.art
# This script should be run on your local machine to pull the latest
# Docker images from GitHub Container Registry and deploy them

# Configuration
GITHUB_USER="$(git config --get user.username)"
REPOSITORY_NAME="garazas.art"
FRONTEND_IMAGE="ghcr.io/$GITHUB_USER/garazas-frontend:latest"
BACKEND_IMAGE="ghcr.io/$GITHUB_USER/garazas-backend:latest"
DEPLOYMENT_DIR="/Users/Lukas/Desktop/code/develop/garazas.art"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Local Deployment for Garazas.art${NC}"
echo "Working directory: $DEPLOYMENT_DIR"
cd $DEPLOYMENT_DIR || { echo -e "${RED}Error: Cannot change to deployment directory${NC}"; exit 1; }

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo -e "${RED}Error: Docker is not running${NC}"
  exit 1
fi

echo -e "${YELLOW}Logging in to GitHub Container Registry...${NC}"
# You need to create a personal access token with packages:read scope
# and save it securely, then use:
# echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USER --password-stdin
# For this example, we'll use an interactive login
docker login ghcr.io

echo -e "${YELLOW}Pulling latest Docker images...${NC}"
docker pull $FRONTEND_IMAGE
docker pull $BACKEND_IMAGE

echo -e "${YELLOW}Stopping existing containers...${NC}"
docker-compose down

echo -e "${YELLOW}Creating local docker-compose override file...${NC}"
cat > docker-compose.local.yml <<EOL
version: '3.8'

services:
  frontend:
    image: ${FRONTEND_IMAGE}
    restart: always

  backend:
    image: ${BACKEND_IMAGE}
    restart: always
EOL

echo -e "${YELLOW}Starting containers with the latest images...${NC}"
docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d

echo -e "${GREEN}Deployment complete! Your application is now running locally with the latest images.${NC}"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8000/api"
echo "Monitoring: http://localhost:19999" 