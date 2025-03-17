#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Stopping Garazas.art Production      ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check if docker-compose.prod.yaml exists
if [ ! -f docker-compose.prod.yaml ]; then
    echo -e "${RED}Error: docker-compose.prod.yaml not found.${NC}"
    exit 1
fi

# Check if any containers are running
if ! docker-compose -f docker-compose.prod.yaml ps | grep -q "Up"; then
    echo -e "${YELLOW}No services are currently running.${NC}"
    exit 0
fi

# Ask for confirmation
echo -e "${YELLOW}This will stop all production services. Are you sure? (y/n)${NC}"
read -r response
if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${BLUE}Operation cancelled.${NC}"
    exit 0
fi

# Stop containers
echo -e "${BLUE}Stopping all services...${NC}"
docker-compose -f docker-compose.prod.yaml down

# Check if services are stopped
if ! docker-compose -f docker-compose.prod.yaml ps | grep -q "Up"; then
    echo -e "${GREEN}All services have been stopped successfully.${NC}"
else
    echo -e "${RED}Error: Some services are still running.${NC}"
    docker-compose -f docker-compose.prod.yaml ps
    exit 1
fi 