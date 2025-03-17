# Troubleshooting Guide

This document provides solutions for common issues that may arise with the Garazas.art application.

## Table of Contents

- [General Troubleshooting Process](#general-troubleshooting-process)
- [Frontend Issues](#frontend-issues)
  - [Blank Pages / 404 Errors](#blank-pages--404-errors)
  - [Slow Page Loading](#slow-page-loading)
  - [UI Rendering Problems](#ui-rendering-problems)
- [Backend Issues](#backend-issues)
  - [API Errors](#api-errors)
  - [Database Connection Issues](#database-connection-issues)
  - [Authentication Problems](#authentication-problems)
- [Infrastructure Issues](#infrastructure-issues)
  - [Docker Container Issues](#docker-container-issues)
  - [Nginx Configuration Problems](#nginx-configuration-problems)
  - [SSL Certificate Issues](#ssl-certificate-issues)
  - [Disk Space Issues](#disk-space-issues)
- [Monitoring Issues](#monitoring-issues)
  - [Netdata Not Showing Data](#netdata-not-showing-data)
  - [Missing Alerts](#missing-alerts)
  - [False Positive Alerts](#false-positive-alerts)
- [Deployment Issues](#deployment-issues)
  - [Failed Deployments](#failed-deployments)
  - [Rollback Problems](#rollback-problems)
- [Emergency Procedures](#emergency-procedures)
  - [Site Outage Response](#site-outage-response)
  - [Security Incident Response](#security-incident-response)

## General Troubleshooting Process

Follow these general steps when troubleshooting any issue:

1. **Identify the problem**: Clearly define what's not working correctly
2. **Check logs**: View application logs for error messages
3. **Verify monitoring**: Check Netdata for system or application anomalies
4. **Isolate the issue**: Determine if it's frontend, backend, or infrastructure related
5. **Test reproduction**: Try to reproduce the issue in a controlled environment
6. **Apply solution**: Fix the issue using the appropriate method
7. **Verify resolution**: Confirm that the solution resolved the problem
8. **Document findings**: Update documentation with any new insights

### Accessing Logs

```bash
# Frontend logs
docker-compose -f docker-compose.production.yaml logs frontend

# Backend logs
docker-compose -f docker-compose.production.yaml logs backend

# Nginx logs
docker-compose -f docker-compose.production.yaml logs nginx

# Netdata logs
docker-compose -f docker-compose.production.yaml logs netdata

# Follow logs in real-time (add -f flag)
docker-compose -f docker-compose.production.yaml logs -f backend
```

## Frontend Issues

### Blank Pages / 404 Errors

**Symptoms**:
- Users see blank pages or 404 errors
- Specific routes don't load properly

**Possible Causes**:
1. Frontend container is not running
2. Nginx configuration issue
3. Build artifacts are missing
4. Route configuration issues

**Solutions**:

1. **Check container status**:
   ```bash
   docker-compose -f docker-compose.production.yaml ps frontend
   ```
   If not running, start it:
   ```bash
   docker-compose -f docker-compose.production.yaml up -d frontend
   ```

2. **Verify Nginx configuration**:
   ```bash
   docker exec garazas-art_nginx_1 nginx -t
   ```
   Fix any reported issues in the Nginx configuration.

3. **Rebuild frontend**:
   ```bash
   docker-compose -f docker-compose.production.yaml build frontend
   docker-compose -f docker-compose.production.yaml up -d frontend
   ```

4. **Check frontend logs for errors**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs frontend
   ```

5. **Verify build artifacts**:
   ```bash
   docker exec garazas-art_frontend_1 ls -la /app/.next
   ```
   If missing or incomplete, rebuild the frontend.

### Slow Page Loading

**Symptoms**:
- Pages take a long time to load
- Assets load slowly or timeout

**Possible Causes**:
1. Server resource constraints
2. Network issues
3. Large assets not optimized
4. Backend API delays

**Solutions**:

1. **Check system resources**:
   Access Netdata and check CPU, memory, and network usage.
   
2. **Verify backend response times**:
   ```bash
   curl -w "@curl-format.txt" -o /dev/null -s https://api.garazas.art/health
   ```
   
3. **Test network latency**:
   ```bash
   ping garazas.art
   traceroute garazas.art
   ```
   
4. **Check Nginx caching**:
   Verify that static assets are being cached properly:
   ```bash
   curl -I https://garazas.art/static/images/logo.png
   ```
   Look for cache-related headers in the response.

5. **Optimize images**:
   Ensure images are properly sized and compressed.

### UI Rendering Problems

**Symptoms**:
- Broken layouts
- Missing UI elements
- CSS styling issues

**Possible Causes**:
1. CSS or JavaScript not loading
2. Incompatible browser versions
3. Server-side rendering issues
4. Failed asset loading

**Solutions**:

1. **Check browser console for errors**:
   Open browser developer tools and examine the console for error messages.
   
2. **Clear browser cache**:
   Try clearing the browser cache or testing in incognito mode.
   
3. **Verify static assets**:
   ```bash
   curl -I https://garazas.art/static/css/main.css
   ```
   
4. **Rebuild with clean cache**:
   ```bash
   docker-compose -f docker-compose.production.yaml build --no-cache frontend
   docker-compose -f docker-compose.production.yaml up -d frontend
   ```

5. **Check compatibility**:
   Test in multiple browsers to isolate browser-specific issues.

## Backend Issues

### API Errors

**Symptoms**:
- API endpoints return error codes (4xx or 5xx)
- Frontend shows API error messages
- Data doesn't load properly

**Possible Causes**:
1. Backend container is not running
2. Code errors in API routes
3. Authentication issues
4. Database connection problems
5. Resource limitations

**Solutions**:

1. **Check container status**:
   ```bash
   docker-compose -f docker-compose.production.yaml ps backend
   ```
   
2. **View API logs**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs backend
   ```
   Look for error messages or stack traces.
   
3. **Test API directly**:
   ```bash
   curl -i https://api.garazas.art/health
   curl -i https://api.garazas.art/api/exhibitions
   ```
   
4. **Check API metrics in Netdata**:
   Look for response time increases or error rate spikes.
   
5. **Restart backend service**:
   ```bash
   docker-compose -f docker-compose.production.yaml restart backend
   ```

6. **Verify environment variables**:
   ```bash
   docker exec garazas-art_backend_1 env | grep API_
   ```
   Ensure all required environment variables are set correctly.

### Database Connection Issues

**Symptoms**:
- API returns database connection errors
- Data isn't being saved or retrieved
- Backend logs show Google Sheets API errors

**Possible Causes**:
1. Google Sheets API credentials missing or invalid
2. API rate limiting
3. Network connectivity issues
4. Permission problems

**Solutions**:

1. **Check Google Sheets credentials**:
   ```bash
   ls -la /opt/garazas-art/credentials/
   ```
   Ensure the credentials file exists and has proper permissions.
   
2. **Verify API access**:
   ```bash
   docker exec -it garazas-art_backend_1 python -c "from app.services.sheets import test_connection; print(test_connection())"
   ```
   
3. **Check for API quota issues**:
   Look for rate limiting messages in the logs:
   ```bash
   docker-compose -f docker-compose.production.yaml logs backend | grep "quota"
   ```
   
4. **Renew Google Sheets API credentials**:
   If necessary, generate new credentials in the Google Cloud Console and update the credentials file.
   
5. **Verify sheet permissions**:
   Ensure the service account has proper access to the Google Sheet.

### Authentication Problems

**Symptoms**:
- Users can't log in
- Admin section is inaccessible
- API returns 401/403 errors

**Possible Causes**:
1. JWT secret key issues
2. Expired tokens
3. Misconfigured auth settings
4. User permission problems

**Solutions**:

1. **Check JWT configuration**:
   Verify JWT settings in environment variables:
   ```bash
   docker exec garazas-art_backend_1 env | grep JWT
   ```
   
2. **Test admin login**:
   ```bash
   curl -X POST https://api.garazas.art/api/auth/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=admin&password=yourpassword"
   ```
   
3. **Reset admin password if needed**:
   ```bash
   docker exec -it garazas-art_backend_1 python -c "from app.services.auth import create_admin; create_admin('admin', 'new-password')"
   ```
   
4. **Check token validity**:
   ```bash
   docker exec -it garazas-art_backend_1 python -c "from app.services.auth import validate_token; print(validate_token('your-token'))"
   ```
   
5. **Restart the backend to clear any cached auth data**:
   ```bash
   docker-compose -f docker-compose.production.yaml restart backend
   ```

## Infrastructure Issues

### Docker Container Issues

**Symptoms**:
- Containers stop unexpectedly
- Services are unavailable
- Resource usage alerts in Netdata

**Possible Causes**:
1. Out of memory errors
2. Docker daemon issues
3. Container configuration problems
4. Host system resource constraints

**Solutions**:

1. **Check container status**:
   ```bash
   docker-compose -f docker-compose.production.yaml ps
   ```
   
2. **View container logs**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs
   ```
   
3. **Check for OOM (Out of Memory) kills**:
   ```bash
   dmesg | grep -i "out of memory"
   ```
   
4. **Restart Docker daemon if needed**:
   ```bash
   sudo systemctl restart docker
   ```
   
5. **Restart containers**:
   ```bash
   docker-compose -f docker-compose.production.yaml down
   docker-compose -f docker-compose.production.yaml up -d
   ```
   
6. **Adjust container memory limits**:
   Edit `docker-compose.production.yaml` to increase memory limits if needed.

### Nginx Configuration Problems

**Symptoms**:
- 502 Bad Gateway errors
- Incorrect redirects
- SSL certificate errors

**Possible Causes**:
1. Nginx configuration syntax errors
2. Upstream service unavailable
3. SSL certificate issues
4. Incorrect proxy settings

**Solutions**:

1. **Test Nginx configuration**:
   ```bash
   docker exec garazas-art_nginx_1 nginx -t
   ```
   
2. **Check Nginx logs**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs nginx
   ```
   
3. **Verify upstream services**:
   ```bash
   docker exec garazas-art_nginx_1 curl -I http://frontend:3000
   docker exec garazas-art_nginx_1 curl -I http://backend:8000/health
   ```
   
4. **Reload Nginx configuration after changes**:
   ```bash
   docker exec garazas-art_nginx_1 nginx -s reload
   ```
   
5. **Reset Nginx configuration from backup if needed**:
   ```bash
   cp /opt/garazas-backups/nginx/nginx.conf.production.backup /opt/garazas-art/nginx/nginx.conf.production
   docker-compose -f docker-compose.production.yaml restart nginx
   ```

### SSL Certificate Issues

**Symptoms**:
- SSL errors in browser
- Certificate warnings
- "Connection not secure" messages

**Possible Causes**:
1. Expired SSL certificates
2. Incorrect certificate paths
3. Missing certificate files
4. Misconfigured Nginx SSL settings

**Solutions**:

1. **Check certificate status**:
   ```bash
   sudo certbot certificates
   ```
   
2. **Verify certificate files**:
   ```bash
   ls -la /etc/letsencrypt/live/garazas.art/
   ```
   
3. **Renew certificates if needed**:
   ```bash
   sudo certbot renew --force-renewal
   ```
   
4. **Restart Nginx after certificate renewal**:
   ```bash
   docker-compose -f docker-compose.production.yaml restart nginx
   ```
   
5. **Manually verify certificate dates**:
   ```bash
   echo | openssl s_client -connect garazas.art:443 -servername garazas.art 2>/dev/null | openssl x509 -noout -dates
   ```

### Disk Space Issues

**Symptoms**:
- "No space left on device" errors
- Services failing to start
- Slow system performance

**Possible Causes**:
1. Logs filling disk space
2. Docker images/volumes accumulating
3. Temporary files not being cleaned
4. Backups consuming space

**Solutions**:

1. **Check disk usage**:
   ```bash
   df -h
   ```
   
2. **Find large files/directories**:
   ```bash
   sudo du -sh /* | sort -hr | head -10
   ```
   
3. **Clean Docker resources**:
   ```bash
   docker system prune -af --volumes
   ```
   (Warning: This removes all unused containers, images, and volumes)
   
4. **Rotate and compress logs**:
   ```bash
   sudo find /var/log -type f -name "*.log" -exec gzip {} \;
   ```
   
5. **Clean temporary files**:
   ```bash
   sudo rm -rf /tmp/*
   ```
   
6. **Archive or offload old backups**:
   ```bash
   find /opt/garazas-backups -type f -mtime +30 -delete
   ```

## Monitoring Issues

### Netdata Not Showing Data

**Symptoms**:
- Netdata dashboard shows no data
- Charts display "no data"
- Specific metrics are missing

**Possible Causes**:
1. Netdata container not running
2. Collector issues
3. Permission problems
4. Configuration errors

**Solutions**:

1. **Check Netdata container status**:
   ```bash
   docker-compose -f docker-compose.production.yaml ps netdata
   ```
   
2. **View Netdata logs**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs netdata
   ```
   
3. **Restart Netdata**:
   ```bash
   docker-compose -f docker-compose.production.yaml restart netdata
   ```
   
4. **Check Netdata health**:
   ```bash
   curl -s http://localhost:19999/api/v1/info
   ```
   
5. **Verify permissions**:
   ```bash
   ls -la /var/run/docker.sock
   ```
   Ensure it's readable by the Netdata container.
   
6. **Rebuild Netdata configuration**:
   ```bash
   docker-compose -f docker-compose.production.yaml down netdata
   docker volume rm garazas-art_netdata_config
   docker-compose -f docker-compose.production.yaml up -d netdata
   ```

### Missing Alerts

**Symptoms**:
- Expected alerts are not triggering
- No notifications for concerning conditions
- Alert status shows green when it should be warning/critical

**Possible Causes**:
1. Alert configuration issues
2. Notification settings problems
3. Thresholds set incorrectly

**Solutions**:

1. **Check alert configuration**:
   ```bash
   docker exec -it garazas-art_netdata_1 cat /etc/netdata/health.d/garazas.conf
   ```
   
2. **Test alert notifications**:
   ```bash
   docker exec -it garazas-art_netdata_1 /usr/libexec/netdata/plugins.d/alarm-notify.sh test
   ```
   
3. **Verify email/Slack configuration**:
   ```bash
   docker exec -it garazas-art_netdata_1 cat /etc/netdata/health_alarm_notify.conf | grep -E "SEND_EMAIL|SLACK"
   ```
   
4. **Restart Netdata after configuration changes**:
   ```bash
   docker-compose -f docker-compose.production.yaml restart netdata
   ```

### False Positive Alerts

**Symptoms**:
- Frequent meaningless alerts
- Alerts triggering during normal operation
- Alert fatigue among team members

**Possible Causes**:
1. Thresholds too sensitive
2. Normal temporary spikes triggering alerts
3. Misconfigured monitoring

**Solutions**:

1. **Adjust alert thresholds**:
   Edit `/opt/garazas-art/monitoring/health.d/garazas.conf` and modify the warning/critical thresholds.
   
2. **Add delay to alerts**:
   Modify the lookup line to consider a longer time period:
   ```
   lookup: average -5m
   ```
   
3. **Add hysteresis to prevent flapping**:
   ```
   hysteresis: 0.2
   ```
   
4. **Silence specific alerts during maintenance**:
   ```bash
   docker exec -it garazas-art_netdata_1 /usr/libexec/netdata/plugins.d/alarm-notify.sh silence "alert_name" $((30 * 60))
   ```
   This silences an alert for 30 minutes.

## Deployment Issues

### Failed Deployments

**Symptoms**:
- Deployment script exits with errors
- Services don't start after deployment
- Old version remains active

**Possible Causes**:
1. Git conflicts
2. Build failures
3. Environment configuration issues
4. Dependency problems

**Solutions**:

1. **Check deployment logs**:
   ```bash
   cat /var/log/deploy.log
   ```
   
2. **Build containers individually to isolate issues**:
   ```bash
   docker-compose -f docker-compose.production.yaml build frontend
   docker-compose -f docker-compose.production.yaml build backend
   ```
   
3. **Verify environment file**:
   ```bash
   cat /opt/garazas-art/.env.production
   ```
   Check for missing or incorrect values.
   
4. **Reset Git state**:
   ```bash
   cd /opt/garazas-art
   git fetch --all
   git reset --hard origin/main
   ```
   
5. **Clean Docker cache and rebuild**:
   ```bash
   docker-compose -f docker-compose.production.yaml build --no-cache
   docker-compose -f docker-compose.production.yaml up -d
   ```

### Rollback Problems

**Symptoms**:
- Rollback fails to restore previous version
- Services crash after rollback
- Inconsistent state after rollback

**Possible Causes**:
1. Incompatible data structures
2. Missing or corrupted backups
3. Dependency incompatibilities
4. Configuration changes

**Solutions**:

1. **Check rollback script output**:
   Look for error messages during the rollback process.
   
2. **Verify target commit exists**:
   ```bash
   cd /opt/garazas-art
   git show <commit-hash>
   ```
   
3. **Check for available backups**:
   ```bash
   ls -la /opt/garazas-backups
   ```
   
4. **Manually apply backup configuration**:
   ```bash
   cp /opt/garazas-backups/.env.production.YYYY-MM-DD /opt/garazas-art/.env.production
   ```
   
5. **Clean environment and restart from scratch**:
   ```bash
   cd /opt/garazas-art
   git fetch --all
   git checkout <known-working-commit>
   docker-compose -f docker-compose.production.yaml down
   docker-compose -f docker-compose.production.yaml up -d
   ```

## Emergency Procedures

### Site Outage Response

If the site becomes completely unavailable, follow these steps:

1. **Check system status**:
   ```bash
   uptime
   free -m
   df -h
   ```
   
2. **Verify network connectivity**:
   ```bash
   ping -c 4 google.com
   traceroute garazas.art
   ```
   
3. **Check running services**:
   ```bash
   docker-compose -f docker-compose.production.yaml ps
   ```
   
4. **View recent logs**:
   ```bash
   docker-compose -f docker-compose.production.yaml logs --tail=100
   ```
   
5. **Restart all services**:
   ```bash
   docker-compose -f docker-compose.production.yaml down
   docker-compose -f docker-compose.production.yaml up -d
   ```
   
6. **If still unavailable, roll back to last known good state**:
   ```bash
   cd /opt/garazas-art
   ./scripts/rollback.sh <last-known-good-commit>
   ```
   
7. **If rollback doesn't resolve the issue**:
   - Check disk space and clean if necessary
   - Verify server hasn't run out of memory
   - Check for hardware issues in host provider dashboard
   - Consider temporarily pointing DNS to a static maintenance page while investigating

### Security Incident Response

If you suspect a security breach:

1. **Isolate the system**:
   Disconnect from public internet if possible, or limit access to trusted IPs:
   ```bash
   sudo ufw default deny incoming
   sudo ufw allow from trusted-ip-address to any port 22
   sudo ufw enable
   ```
   
2. **Capture forensic evidence**:
   ```bash
   # Capture process list
   ps aux > /tmp/processes-$(date +%Y%m%d-%H%M%S).txt
   
   # Capture network connections
   netstat -tulanp > /tmp/netstat-$(date +%Y%m%d-%H%M%S).txt
   
   # Capture logs
   docker-compose -f docker-compose.production.yaml logs > /tmp/docker-logs-$(date +%Y%m%d-%H%M%S).txt
   ```
   
3. **Check for unauthorized access**:
   ```bash
   last | head -20
   grep "Failed password" /var/log/auth.log
   ```
   
4. **Change all credentials**:
   - Reset admin password
   - Rotate API keys
   - Update JWT secret
   - Change server SSH keys
   
5. **Scan for malware or unauthorized changes**:
   ```bash
   sudo apt install -y rkhunter
   sudo rkhunter --check
   ```
   
6. **Remove any compromised components**:
   If specific containers are compromised, rebuild them from known good images.
   
7. **Document the incident**:
   Record all findings and actions taken during response.
   
8. **After containment, develop and implement mitigation plan**:
   - Patch vulnerabilities
   - Update security configurations
   - Implement additional monitoring
   - Review access controls 