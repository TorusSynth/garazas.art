#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Garazas.art Production Deployment    ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Function to check if a command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 is required but not installed.${NC}"
        exit 1
    fi
}

# Check prerequisites
check_command docker
check_command docker-compose

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found. Creating from example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env file with your actual values before continuing.${NC}"
    exit 1
fi

# Load environment variables
set -a
source .env
set +a

# Validate required environment variables
if [ -z "$DOMAIN_NAME" ] || [ -z "$EMAIL" ] || [ -z "$PROD_SECRET_KEY" ] || [ -z "$REGISTRATION_SHEET_ID" ]; then
    echo -e "${RED}Error: Required environment variables are missing.${NC}"
    echo -e "${RED}Please make sure the following variables are set in your .env file:${NC}"
    echo -e "${RED}- DOMAIN_NAME${NC}"
    echo -e "${RED}- EMAIL${NC}"
    echo -e "${RED}- PROD_SECRET_KEY${NC}"
    echo -e "${RED}- REGISTRATION_SHEET_ID${NC}"
    exit 1
fi

# Check Google credentials
if [ ! -f "backend/credentials/google-service-account.json" ]; then
    echo -e "${RED}Error: Google service account credentials not found.${NC}"
    echo -e "${RED}Please place your credentials file at backend/credentials/google-service-account.json${NC}"
    exit 1
fi

# Create necessary directories
mkdir -p nginx/logs
mkdir -p nginx/certbot/conf
mkdir -p nginx/certbot/www
mkdir -p backend/data

# Check if the domain is configured for SSL
if [ ! -d "nginx/certbot/conf/live/$DOMAIN_NAME" ]; then
    echo -e "${YELLOW}SSL certificates not found. Setting up Let's Encrypt for $DOMAIN_NAME...${NC}"
    
    # Create initial nginx config without SSL
    cat > nginx/nginx.init.conf << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 200 'The server is being set up. Please come back later.';
        add_header Content-Type text/plain;
    }
}
EOF

    # Start nginx for certbot validation
    echo -e "${BLUE}Starting temporary Nginx server for Let's Encrypt validation...${NC}"
    docker-compose -f docker-compose.init.yaml up -d nginx
    
    # Wait for Nginx to start
    echo -e "${BLUE}Waiting for Nginx to start...${NC}"
    sleep 5
    
    # Get certificates
    echo -e "${BLUE}Obtaining SSL certificates from Let's Encrypt...${NC}"
    docker-compose -f docker-compose.init.yaml run --rm certbot certonly --webroot -w /var/www/certbot \
        --email $EMAIL --agree-tos --no-eff-email \
        -d $DOMAIN_NAME -d www.$DOMAIN_NAME
    
    # Stop init containers
    echo -e "${BLUE}Stopping temporary Nginx server...${NC}"
    docker-compose -f docker-compose.init.yaml down
    
    echo -e "${GREEN}SSL certificates successfully obtained.${NC}"
fi

# Check if a backup directory is configured and exists
if [ ! -z "$BACKUP_PATH" ] && [ ! -d "$BACKUP_PATH" ]; then
    echo -e "${YELLOW}Creating backup directory at $BACKUP_PATH...${NC}"
    mkdir -p $BACKUP_PATH
fi

# Pull the latest changes if this is a git repository
if [ -d .git ]; then
    echo -e "${BLUE}Pulling latest changes from git repository...${NC}"
    git pull
fi

# Set SECRET_KEY from PROD_SECRET_KEY for production
export SECRET_KEY=$PROD_SECRET_KEY

# Start the production environment
echo -e "${BLUE}Starting production environment...${NC}"
docker-compose -f docker-compose.prod.yaml up -d --build

# Check if services are running
echo -e "${BLUE}Checking if services are running...${NC}"
sleep 10

if docker-compose -f docker-compose.prod.yaml ps | grep -q "Up"; then
    echo -e "${GREEN}Production environment is now running!${NC}"
    echo -e "${GREEN}Your application is available at https://$DOMAIN_NAME${NC}"
    echo -e "${BLUE}To view logs, run: ./logs.sh${NC}"
    echo -e "${BLUE}To stop the environment, run: ./stop-prod.sh${NC}"
else
    echo -e "${RED}Error: There was a problem starting the services.${NC}"
    echo -e "${RED}Please check the logs with: docker-compose -f docker-compose.prod.yaml logs${NC}"
    exit 1
fi 