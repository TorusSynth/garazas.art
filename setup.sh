#!/bin/bash

# Setup script for Garazas.art Exhibition Platform

echo "Setting up Garazas.art Exhibition Platform..."

# Create required directories
mkdir -p backend/credentials
mkdir -p backend/data/exhibitions
mkdir -p nginx/ssl
mkdir -p nginx/certbot/conf
mkdir -p nginx/certbot/www

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file from .env.example. Please update it with your values."
else
  echo ".env file already exists."
fi

# Create placeholder for Google Sheets API credentials
if [ ! -f backend/credentials/google-service-account.json ]; then
  echo "{}" > backend/credentials/google-service-account.json
  echo "Created placeholder for Google Sheets API credentials. Please replace it with your actual service account credentials."
fi

# Set permissions
chmod +x setup.sh
chmod +x start-dev.sh
chmod +x start-prod.sh

echo "Setup complete! You can now run ./start-dev.sh to start the development environment." 