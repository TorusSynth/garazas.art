#!/bin/bash
set -e

# Colors for pretty output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Setting up Netdata for Garazas.art   ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Ensure we have the necessary directories
mkdir -p monitoring/health.d monitoring/python.d

# Check if environment file exists
if [ ! -f monitoring/netdata.env ]; then
    echo -e "${YELLOW}Creating environment file...${NC}"
    cp monitoring/netdata.env.example monitoring/netdata.env
    echo -e "${GREEN}Created monitoring/netdata.env${NC}"
    echo -e "${YELLOW}Please edit this file to set your Netdata Cloud token${NC}"
fi

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed.${NC}"
    exit 1
fi

# Check for docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose is not installed.${NC}"
    exit 1
fi

# Set permissions
chmod +x monitoring/setup-netdata.sh

# Create password file for basic authentication
echo -e "${YELLOW}Setting up authentication...${NC}"
if [ -f monitoring/netdata.env ]; then
    source monitoring/netdata.env
    if [ -n "$NETDATA_ADMIN_USER" ] && [ -n "$NETDATA_ADMIN_PASSWORD" ]; then
        # Generate password hash for basic auth
        docker run --rm -it netdata/netdata:latest bash -c "echo -n '$NETDATA_ADMIN_USER:' > /tmp/passwd && echo '$NETDATA_ADMIN_PASSWORD' | mkpasswd -m sha-512 >> /tmp/passwd && cat /tmp/passwd"
        echo -e "${GREEN}Generated password hash for user $NETDATA_ADMIN_USER${NC}"
        echo -e "${YELLOW}Include this in your netdata.conf file or mount the passwd file${NC}"
    else
        echo -e "${YELLOW}No authentication credentials found in netdata.env${NC}"
    fi
else
    echo -e "${YELLOW}netdata.env file not found.${NC}"
fi

echo -e "${GREEN}Setup completed!${NC}"
echo -e "${YELLOW}Start Netdata with: docker-compose up -d netdata${NC}"
echo -e "${YELLOW}Access the dashboard at: http://localhost:19999${NC}"
echo -e "${YELLOW}For full documentation on Netdata configuration, visit: https://learn.netdata.cloud/${NC}" 