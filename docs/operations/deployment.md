# Deployment Guide

This document outlines the deployment process for the Garazas.art application in production environments.

## Table of Contents

- [Deployment Overview](#deployment-overview)
- [Prerequisites](#prerequisites)
- [Infrastructure Setup](#infrastructure-setup)
- [Environment Configuration](#environment-configuration)
- [Deployment Process](#deployment-process)
- [SSL Certificate Management](#ssl-certificate-management)
- [Database Backup and Restore](#database-backup-and-restore)
- [Continuous Integration/Continuous Deployment](#continuous-integrationcontinuous-deployment)
- [Rollback Procedures](#rollback-procedures)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)

## Deployment Overview

The Garazas.art application is deployed as a set of Docker containers orchestrated with Docker Compose. The architecture consists of:

- **Frontend**: Next.js application
- **Backend**: FastAPI application
- **Nginx**: Web server for serving the frontend and proxying API requests
- **Netdata**: Monitoring system

![Deployment Architecture](../images/deployment_architecture.png)

## Prerequisites

- **Server Requirements**:
  - Linux server (Ubuntu 20.04 LTS recommended)
  - Minimum 2 CPU cores, 4GB RAM, 20GB storage
  - SSH access with sudo privileges
  - Domain name pointing to the server
  
- **Software Requirements**:
  - Docker (v20.10+)
  - Docker Compose (v2.0+)
  - Git (v2.25+)
  - Certbot for SSL certificates

## Infrastructure Setup

### Server Provisioning

1. **Create a server** with your cloud provider (AWS, DigitalOcean, Linode, etc.)
2. **Configure SSH access**:
   ```bash
   ssh-copy-id user@your-server-ip
   ```
3. **Update and upgrade packages**:
   ```bash
   ssh user@your-server-ip
   sudo apt update && sudo apt upgrade -y
   ```

### Install Docker and Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Set Up Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Enable firewall
sudo ufw enable
```

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

## Environment Configuration

### Clone Repository

```bash
git clone https://github.com/your-organization/garazas.art.git /opt/garazas-art
cd /opt/garazas-art
```

### Create Production Environment File

Create a `.env.production` file with your production settings:

```bash
cp .env.example .env.production
nano .env.production
```

Configure the following essential variables:

```
# General
NODE_ENV=production
DEPLOYMENT_ENV=production

# URLs
NEXT_PUBLIC_BASE_URL=https://garazas.art
NEXT_PUBLIC_API_URL=https://api.garazas.art

# API Keys
GOOGLE_SHEETS_API_KEY=your-api-key
GOOGLE_SHEETS_ID=your-sheet-id

# Auth
JWT_SECRET=your-jwt-secret
API_KEY=your-api-key

# Netdata
NETDATA_CLAIM_TOKEN=your-netdata-token
NETDATA_CLAIM_ROOMS=your-netdata-room-id
NETDATA_ADMIN_PASSWORD=your-netdata-password

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password
FROM_EMAIL=no-reply@garazas.art
```

### Configure Nginx

Create a production Nginx configuration:

```bash
cp nginx/nginx.conf.example nginx/nginx.conf.production
nano nginx/nginx.conf.production
```

Update the server names and SSL certificate paths:

```nginx
server {
    listen 80;
    server_name garazas.art www.garazas.art;
    return 301 https://garazas.art$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.garazas.art;
    
    ssl_certificate /etc/letsencrypt/live/garazas.art/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/garazas.art/privkey.pem;
    
    return 301 https://garazas.art$request_uri;
}

server {
    listen 443 ssl http2;
    server_name garazas.art;
    
    ssl_certificate /etc/letsencrypt/live/garazas.art/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/garazas.art/privkey.pem;
    
    # ... rest of the configuration
}

server {
    listen 443 ssl http2;
    server_name api.garazas.art;
    
    ssl_certificate /etc/letsencrypt/live/api.garazas.art/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.garazas.art/privkey.pem;
    
    # ... rest of the configuration
}
```

### Create Production Docker Compose File

```bash
cp docker-compose.yaml docker-compose.production.yaml
nano docker-compose.production.yaml
```

Update for production settings:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.production
    restart: always
    env_file:
      - .env.production
    volumes:
      - frontend_build:/app/.next
    networks:
      - app_network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.production
    restart: always
    env_file:
      - .env.production
    volumes:
      - ./credentials:/app/credentials:ro
      - ./data:/app/data
    networks:
      - app_network

  nginx:
    image: nginx:1.25
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf.production:/etc/nginx/conf.d/default.conf:ro
      - frontend_build:/var/www/html/.next
      - ./frontend/public:/var/www/html/public:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app_network

  netdata:
    image: netdata/netdata:latest
    restart: always
    cap_add:
      - SYS_PTRACE
    security_opt:
      - apparmor:unconfined
    volumes:
      - netdata_config:/etc/netdata
      - netdata_lib:/var/lib/netdata
      - netdata_cache:/var/cache/netdata
      - /etc/passwd:/host/etc/passwd:ro
      - /etc/group:/host/etc/group:ro
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /etc/os-release:/host/etc/os-release:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    env_file:
      - ./monitoring/netdata.env
    ports:
      - "19999:19999"
    networks:
      - app_network

volumes:
  frontend_build:
  netdata_config:
  netdata_lib:
  netdata_cache:

networks:
  app_network:
    driver: bridge
```

## Deployment Process

### Initial Deployment

1. **Set up SSL certificates**:
   ```bash
   sudo certbot certonly --standalone -d garazas.art -d www.garazas.art -d api.garazas.art
   ```

2. **Build and start the application**:
   ```bash
   docker-compose -f docker-compose.production.yaml build
   docker-compose -f docker-compose.production.yaml up -d
   ```

3. **Verify the deployment**:
   ```bash
   docker-compose -f docker-compose.production.yaml ps
   ```

4. **Check logs for any issues**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs -f
   ```

### Deployment Script

Create a deployment script in `scripts/deploy.sh`:

```bash
#!/bin/bash
set -e

# Change to application directory
cd /opt/garazas-art

# Pull latest changes
git pull

# Create backup of current environment
cp .env.production .env.production.backup

# Update environment variables if needed
# cp .env.production.new .env.production

# Build and restart services
docker-compose -f docker-compose.production.yaml build
docker-compose -f docker-compose.production.yaml up -d

# Check status
docker-compose -f docker-compose.production.yaml ps

echo "Deployment completed successfully!"
```

Make the script executable:

```bash
chmod +x scripts/deploy.sh
```

## SSL Certificate Management

### Automatic Renewal

Set up a cron job to renew SSL certificates:

```bash
sudo crontab -e
```

Add the following line:

```
0 3 * * * certbot renew --quiet --post-hook "docker restart garazas-art_nginx_1"
```

This will attempt to renew certificates at 3 AM daily and restart Nginx if certificates are renewed.

### Manual Renewal

If needed, you can manually renew certificates:

```bash
sudo certbot renew
docker restart garazas-art_nginx_1
```

## Database Backup and Restore

Since the application uses Google Sheets as its primary data store, regular backups of the credentials and any locally stored data are essential.

### Backup Script

Create a backup script in `scripts/backup.sh`:

```bash
#!/bin/bash
set -e

# Set variables
BACKUP_DIR="/opt/garazas-backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
APP_DIR="/opt/garazas-art"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup environment files
cp $APP_DIR/.env.production $BACKUP_DIR/.env.production.$DATE

# Backup credentials
tar -czf $BACKUP_DIR/credentials.$DATE.tar.gz -C $APP_DIR credentials

# Backup data directory
tar -czf $BACKUP_DIR/data.$DATE.tar.gz -C $APP_DIR data

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.tar.gz" -type f -mtime +30 -delete
find $BACKUP_DIR -name ".env.production.*" -type f -mtime +30 -delete

echo "Backup completed: $(date)"
```

Make the script executable and set up a cron job:

```bash
chmod +x scripts/backup.sh
sudo crontab -e
```

Add the following to run daily backups at 2 AM:

```
0 2 * * * /opt/garazas-art/scripts/backup.sh >> /var/log/garazas-backups.log 2>&1
```

### Restore Procedure

To restore from a backup:

```bash
# Restore environment file
cp /opt/garazas-backups/.env.production.[DATE] /opt/garazas-art/.env.production

# Restore credentials
tar -xzf /opt/garazas-backups/credentials.[DATE].tar.gz -C /opt/garazas-art

# Restore data
tar -xzf /opt/garazas-backups/data.[DATE].tar.gz -C /opt/garazas-art

# Restart services
cd /opt/garazas-art
docker-compose -f docker-compose.production.yaml restart
```

## Continuous Integration/Continuous Deployment

### GitHub Actions Workflow

Create a GitHub Actions workflow for CI/CD in `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Execute remote SSH commands
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /opt/garazas-art
          git pull
          ./scripts/deploy.sh
```

### Required GitHub Secrets

Set up the following secrets in your GitHub repository:

- `HOST`: Your server IP address
- `USERNAME`: SSH username
- `SSH_PRIVATE_KEY`: Private SSH key for authentication

## Rollback Procedures

### Rolling Back to a Previous Version

If a deployment causes issues, you can roll back to a previous version:

```bash
cd /opt/garazas-art

# Checkout the previous version
git checkout <previous-commit-hash>

# Restore the previous environment if needed
cp .env.production.backup .env.production

# Rebuild and restart
docker-compose -f docker-compose.production.yaml build
docker-compose -f docker-compose.production.yaml up -d
```

### Emergency Rollback Script

Create an emergency rollback script in `scripts/rollback.sh`:

```bash
#!/bin/bash
set -e

# Change to application directory
cd /opt/garazas-art

# Check if commit hash is provided
if [ -z "$1" ]; then
  echo "Usage: ./rollback.sh <commit-hash>"
  exit 1
fi

# Checkout specific version
git checkout $1

# Restore backed up environment
if [ -f .env.production.backup ]; then
  cp .env.production.backup .env.production
  echo "Restored backed up environment variables"
fi

# Rebuild and restart
docker-compose -f docker-compose.production.yaml build
docker-compose -f docker-compose.production.yaml up -d

echo "Rollback to $1 completed"
```

Make the script executable:

```bash
chmod +x scripts/rollback.sh
```

Usage:

```bash
./scripts/rollback.sh a1b2c3d4
```

## Post-Deployment Verification

After each deployment, verify the following:

1. **Website Accessibility**:
   - Check that the website is accessible at https://garazas.art
   - Verify that all pages load correctly
   - Test key functionality

2. **API Accessibility**:
   - Verify the API is accessible at https://api.garazas.art
   - Test a few key endpoints

3. **Monitoring**:
   - Check Netdata dashboard at https://garazas.art:19999
   - Verify that all services are reporting correctly

4. **SSL Certificates**:
   - Verify SSL certificates are valid and not expired
   ```bash
   echo | openssl s_client -connect garazas.art:443 -servername garazas.art 2>/dev/null | openssl x509 -noout -dates
   ```

## Troubleshooting

### Common Issues and Solutions

#### Container Fails to Start

```bash
# Check container logs
docker-compose -f docker-compose.production.yaml logs <service-name>

# Restart specific container
docker-compose -f docker-compose.production.yaml restart <service-name>
```

#### Nginx Configuration Issues

```bash
# Test Nginx configuration
docker exec garazas-art_nginx_1 nginx -t

# If there are errors, fix the configuration file and reload
docker exec garazas-art_nginx_1 nginx -s reload
```

#### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates if needed
sudo certbot renew --force-renewal
docker restart garazas-art_nginx_1
```

#### Database Connection Issues

Check Google Sheets API credentials:

```bash
# Verify the credentials file exists
ls -la /opt/garazas-art/credentials/

# Check logs for API errors
docker-compose -f docker-compose.production.yaml logs backend
```

### Monitoring Logs

Set up log monitoring with logrotate to prevent log files from growing too large:

```bash
sudo nano /etc/logrotate.d/docker-compose
```

Add the following configuration:

```
/var/lib/docker/containers/*/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    copytruncate
}
```

## Maintenance Tasks

### Regular Updates

Perform regular maintenance on a monthly basis:

1. **Update system packages**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Update Docker images**:
   ```bash
   docker-compose -f docker-compose.production.yaml pull
   docker-compose -f docker-compose.production.yaml up -d
   ```

3. **Clean up unused Docker resources**:
   ```bash
   docker system prune -af --volumes
   ```

### Health Checks

Set up a cron job to run health checks on your services:

```bash
crontab -e
```

Add the following to check every 5 minutes:

```
*/5 * * * * curl -s https://garazas.art/health > /dev/null || echo "Website down at $(date)" | mail -s "Garazas.art Alert" admin@example.com
*/5 * * * * curl -s https://api.garazas.art/health > /dev/null || echo "API down at $(date)" | mail -s "Garazas.art API Alert" admin@example.com
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Netdata Documentation](https://learn.netdata.cloud/)