#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Updating Garazas.art Production      ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check prerequisites
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker and docker-compose are required.${NC}"
    exit 1
fi

# Check if docker-compose.prod.yaml exists
if [ ! -f docker-compose.prod.yaml ]; then
    echo -e "${RED}Error: docker-compose.prod.yaml not found.${NC}"
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo -e "${RED}Error: .env file not found.${NC}"
    exit 1
fi

# Set SECRET_KEY from PROD_SECRET_KEY for production
export SECRET_KEY=$PROD_SECRET_KEY

# Check if we need to pull changes
PULL=true
REBUILD=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        --no-pull)
            PULL=false
            shift
            ;;
        --rebuild)
            REBUILD=true
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Usage: $0 [--no-pull] [--rebuild]"
            exit 1
            ;;
    esac
done

# Create a backup before updating
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
if [ ! -z "$BACKUP_PATH" ] && [ -d "$BACKUP_PATH" ]; then
    echo -e "${BLUE}Creating backup before updating...${NC}"
    
    # Backup volumes using docker
    if docker volume ls | grep -q "garazas_backend_data"; then
        echo -e "${BLUE}Backing up backend data...${NC}"
        docker run --rm -v garazas_backend_data:/data -v $BACKUP_PATH:/backup alpine tar -czf /backup/backend_data_$BACKUP_DATE.tar.gz /data
    fi
    
    echo -e "${GREEN}Backup completed: $BACKUP_PATH/backend_data_$BACKUP_DATE.tar.gz${NC}"
fi

# Pull latest changes if in a git repository
if [ "$PULL" = true ] && [ -d .git ]; then
    echo -e "${BLUE}Pulling latest changes from git repository...${NC}"
    git pull
fi

# Update command
if [ "$REBUILD" = true ]; then
    echo -e "${BLUE}Rebuilding and updating all services...${NC}"
    docker-compose -f docker-compose.prod.yaml up -d --build
else
    echo -e "${BLUE}Updating services without rebuilding...${NC}"
    docker-compose -f docker-compose.prod.yaml up -d
fi

# Check if services are running
echo -e "${BLUE}Checking if services are running...${NC}"
sleep 5

if docker-compose -f docker-compose.prod.yaml ps | grep -q "Up"; then
    echo -e "${GREEN}Update completed successfully!${NC}"
    echo -e "${GREEN}Your application is available at https://$DOMAIN_NAME${NC}"
    echo -e "${BLUE}To view logs, run: ./logs.sh${NC}"
else
    echo -e "${RED}Error: There was a problem starting the services after update.${NC}"
    echo -e "${RED}Please check the logs with: ./logs.sh${NC}"
    exit 1
fi 