#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Garazas.art Data Backup              ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check prerequisites
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: docker is required.${NC}"
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo -e "${YELLOW}Warning: .env file not found. Using default backup path.${NC}"
    BACKUP_PATH="./backups"
fi

# Use provided backup path or default
BACKUP_PATH=${BACKUP_PATH:-./backups}

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_PATH" ]; then
    echo -e "${BLUE}Creating backup directory at $BACKUP_PATH...${NC}"
    mkdir -p $BACKUP_PATH
fi

# Get timestamp for backup files
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_PREFIX="garazas_backup_${BACKUP_DATE}"

echo -e "${BLUE}Starting backup process...${NC}"

# Backup backend data volume
if docker volume ls | grep -q "garazas_backend_data"; then
    echo -e "${BLUE}Backing up backend data volume...${NC}"
    docker run --rm -v garazas_backend_data:/data -v $BACKUP_PATH:/backup alpine \
        tar -czf /backup/${BACKUP_PREFIX}_backend_data.tar.gz /data
    echo -e "${GREEN}Backend data volume backed up to ${BACKUP_PATH}/${BACKUP_PREFIX}_backend_data.tar.gz${NC}"
else
    echo -e "${YELLOW}Warning: Backend data volume not found.${NC}"
fi

# Backup environment configuration
echo -e "${BLUE}Backing up environment configuration...${NC}"
if [ -f .env ]; then
    cp .env $BACKUP_PATH/${BACKUP_PREFIX}_env.bak
    echo -e "${GREEN}Environment configuration backed up to ${BACKUP_PATH}/${BACKUP_PREFIX}_env.bak${NC}"
fi

# Backup Google credentials
echo -e "${BLUE}Backing up Google Sheets credentials...${NC}"
if [ -f backend/credentials/google-service-account.json ]; then
    cp backend/credentials/google-service-account.json $BACKUP_PATH/${BACKUP_PREFIX}_google_credentials.json
    echo -e "${GREEN}Google credentials backed up to ${BACKUP_PATH}/${BACKUP_PREFIX}_google_credentials.json${NC}"
fi

# Backup SSL certificates if they exist
if [ -d "nginx/certbot/conf/live" ]; then
    echo -e "${BLUE}Backing up SSL certificates...${NC}"
    tar -czf $BACKUP_PATH/${BACKUP_PREFIX}_certificates.tar.gz -C nginx/certbot/conf .
    echo -e "${GREEN}SSL certificates backed up to ${BACKUP_PATH}/${BACKUP_PREFIX}_certificates.tar.gz${NC}"
fi

echo -e "${GREEN}Backup completed successfully!${NC}"
echo -e "${GREEN}All backup files are stored in: $BACKUP_PATH${NC}"

# List all backups
echo -e "${BLUE}Available backups:${NC}"
ls -lh $BACKUP_PATH | grep -v '^total' | awk '{print $9 " (" $5 ")"}' 