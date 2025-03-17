#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Garazas.art Production Logs          ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check if docker-compose.prod.yaml exists
if [ ! -f docker-compose.prod.yaml ]; then
    echo -e "${RED}Error: docker-compose.prod.yaml not found.${NC}"
    exit 1
fi

# Parse arguments
SERVICE=""
TAIL=""
FOLLOW=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -s|--service)
            SERVICE="$2"
            shift
            shift
            ;;
        -n|--tail)
            TAIL="--tail=$2"
            shift
            shift
            ;;
        -f|--follow)
            FOLLOW=true
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Usage: $0 [-s|--service SERVICE] [-n|--tail LINES] [-f|--follow]"
            exit 1
            ;;
    esac
done

# If no services are running, exit
if ! docker-compose -f docker-compose.prod.yaml ps | grep -q "Up"; then
    echo -e "${YELLOW}No services are currently running.${NC}"
    exit 0
fi

# If no service specified, list available services
if [ -z "$SERVICE" ]; then
    echo -e "${BLUE}Available services:${NC}"
    docker-compose -f docker-compose.prod.yaml ps --services
    echo ""
    echo -e "${YELLOW}To view logs for a specific service:${NC}"
    echo -e "${YELLOW}./logs.sh -s SERVICE_NAME${NC}"
    echo -e "${YELLOW}To follow logs in real-time:${NC}"
    echo -e "${YELLOW}./logs.sh -s SERVICE_NAME -f${NC}"
    echo -e "${YELLOW}To view last N lines:${NC}"
    echo -e "${YELLOW}./logs.sh -s SERVICE_NAME -n 100${NC}"
    echo ""
    echo -e "${BLUE}Showing logs for all services:${NC}"
    
    # Show logs for all services
    if [ "$FOLLOW" = true ]; then
        docker-compose -f docker-compose.prod.yaml logs $TAIL -f
    else
        docker-compose -f docker-compose.prod.yaml logs $TAIL
    fi
else
    # Verify the service exists
    if ! docker-compose -f docker-compose.prod.yaml ps --services | grep -q "^$SERVICE$"; then
        echo -e "${RED}Error: Service '$SERVICE' not found.${NC}"
        echo -e "${BLUE}Available services:${NC}"
        docker-compose -f docker-compose.prod.yaml ps --services
        exit 1
    fi
    
    echo -e "${BLUE}Showing logs for $SERVICE:${NC}"
    
    # Show logs for specific service
    if [ "$FOLLOW" = true ]; then
        docker-compose -f docker-compose.prod.yaml logs $TAIL -f $SERVICE
    else
        docker-compose -f docker-compose.prod.yaml logs $TAIL $SERVICE
    fi
fi 