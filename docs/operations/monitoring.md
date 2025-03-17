# Monitoring Guide

This document provides a comprehensive guide for monitoring the Garazas.art application using Netdata.

## Table of Contents

- [Overview](#overview)
- [Accessing Netdata Dashboard](#accessing-netdata-dashboard)
- [Dashboard Navigation](#dashboard-navigation)
- [Critical Metrics](#critical-metrics)
- [Alerts Configuration](#alerts-configuration)
- [Netdata Cloud Integration](#netdata-cloud-integration)
- [Custom Dashboards](#custom-dashboards)
- [Troubleshooting with Netdata](#troubleshooting-with-netdata)
- [Maintenance and Updates](#maintenance-and-updates)

## Overview

Garazas.art uses Netdata for real-time performance monitoring of the entire stack, including system resources, Docker containers, and application services. Netdata provides:

- Real-time, per-second monitoring
- Automatic detection and visualization of metrics
- Pre-configured alerting system
- Low overhead monitoring (typically less than 1% CPU usage)
- Historical data retention

## Accessing Netdata Dashboard

### Local Access

When connected to the server, you can access the Netdata dashboard at:

```
http://localhost:19999
```

### Remote Access

For security reasons, direct remote access to Netdata is disabled by default. You have two options for remote access:

1. **SSH Tunnel**:
   ```bash
   ssh -L 19999:localhost:19999 user@your-server-ip
   ```
   Then access `http://localhost:19999` in your browser.

2. **Netdata Cloud** (recommended):
   Netdata Cloud provides secure remote access with team sharing capabilities. See the [Netdata Cloud Integration](#netdata-cloud-integration) section for setup.

## Dashboard Navigation

### Main Dashboard

The main Netdata dashboard is divided into several sections:

1. **Top Menu**: Provides access to the menu, alerts, settings, and Netdata Cloud connection.
2. **Overview**: Shows a summary of system health and key metrics.
3. **System Section**: Displays metrics for CPU, memory, disk, and network.
4. **Services Section**: Shows metrics for running services like Nginx, Docker, etc.
5. **Applications Section**: Displays metrics for custom application checks.

### Menu Navigation

The left sidebar menu organizes metrics into logical categories:

- **System Overview**: Summary of system health
- **Systems**: System-level metrics (CPU, memory, disks, etc.)
- **Docker Containers**: Metrics for each running container
- **Web Server (Nginx)**: Web server performance metrics
- **APM (Application Performance)**: Application-specific metrics

### Time Controls

At the top of the dashboard, you can control the time window:

- Zoom in/out with the `+` and `-` buttons
- Pan left/right with the arrow buttons
- Select a specific time range by dragging on the timeline
- Reset to real-time view with the "Reset" button

## Critical Metrics

These metrics are most important for monitoring the health of the Garazas.art application:

### System Metrics

1. **CPU Usage**:
   - **Location**: `System → CPU`
   - **Normal Range**: 0-70%
   - **Warning**: >70%
   - **Critical**: >90%
   - **Impact**: High CPU usage can lead to slower response times.

2. **Memory Usage**:
   - **Location**: `System → RAM`
   - **Normal Range**: 0-70%
   - **Warning**: >80%
   - **Critical**: >90%
   - **Impact**: Memory exhaustion can cause out-of-memory errors and container restarts.

3. **Disk Space**:
   - **Location**: `System → Disks`
   - **Normal Range**: 0-80% used
   - **Warning**: >80%
   - **Critical**: >90%
   - **Impact**: Full disks can prevent logging, uploads, and other file operations.

4. **Network Traffic**:
   - **Location**: `System → Network Interfaces`
   - **Normal Range**: Varies by environment
   - **Warning Signs**: Sudden spikes or drops in traffic
   - **Impact**: High network utilization can indicate DDoS or abnormal user activity.

### Docker Container Metrics

1. **Frontend Container**:
   - **Location**: `Docker Containers → frontend`
   - **Key Metrics**: CPU usage, memory usage, network traffic
   - **Warning Signs**: Memory usage above 80%, sustained high CPU

2. **Backend Container**:
   - **Location**: `Docker Containers → backend`
   - **Key Metrics**: CPU usage, memory usage, network traffic
   - **Warning Signs**: Frequent restarts, high memory growth rate

3. **Nginx Container**:
   - **Location**: `Docker Containers → nginx`
   - **Key Metrics**: CPU usage, memory usage, open connections
   - **Warning Signs**: High number of connections, error responses

### Web Server Metrics

1. **Nginx Connections**:
   - **Location**: `Web Server → Nginx → Connections`
   - **Normal Range**: Varies by traffic
   - **Warning Signs**: Sustained high active connections
   - **Impact**: Too many connections may indicate a traffic spike or attack.

2. **Request Rate**:
   - **Location**: `Web Server → Nginx → Requests`
   - **Normal Range**: Varies by traffic
   - **Warning Signs**: Sudden spikes or drops
   - **Impact**: Abnormal request rates may indicate issues with clients or attacks.

3. **HTTP Status Codes**:
   - **Location**: `Web Server → Nginx → Responses by status code`
   - **Warning Signs**: Increased 4xx or 5xx errors
   - **Impact**: Error responses indicate client or server problems.

### Application Metrics

1. **API Response Time**:
   - **Location**: `APM → HTTP Endpoints → API Response Time`
   - **Normal Range**: <200ms
   - **Warning**: >500ms
   - **Critical**: >1000ms
   - **Impact**: Slow responses affect user experience.

2. **API Error Rate**:
   - **Location**: `APM → HTTP Endpoints → API Error Rate`
   - **Normal Range**: <1%
   - **Warning**: >5%
   - **Critical**: >10%
   - **Impact**: High error rates indicate application issues.

3. **Database Operations**:
   - **Location**: `APM → Google Sheets API`
   - **Warning Signs**: Increased latency, error rates
   - **Impact**: Database issues affect all data operations.

## Alerts Configuration

Netdata comes pre-configured with many useful alerts. The Garazas.art deployment includes additional custom alerts specific to our application.

### Viewing Active Alerts

1. Click the "Alerts" button in the top menu.
2. This shows:
   - **Active Alerts**: Currently triggering alerts
   - **Raised Alerts**: Alerts that triggered in the past
   - **Configured Alerts**: All defined alerts

### Alert States

Alerts have different states indicated by colors:

- **Green**: Normal - everything is fine
- **Yellow**: Warning - something may need attention
- **Red**: Critical - requires immediate attention
- **Blue**: Cleared - was in an alert state but returned to normal

### Custom Alert Settings

Custom alerts for Garazas.art are defined in the following files:

- `/opt/garazas-art/monitoring/health.d/garazas.conf`: Application-specific alerts
- `/opt/garazas-art/monitoring/health.d/nginx.conf`: Web server alerts
- `/opt/garazas-art/monitoring/health.d/system.conf`: System resource alerts

### Modifying Alerts

To modify an existing alert:

1. Edit the relevant configuration file
2. Restart the Netdata container:
   ```bash
   docker-compose -f docker-compose.production.yaml restart netdata
   ```

Example alert configuration for API response time:

```
alarm: api_response_time
on: httpcheck.responsetime_average_garazas_api
lookup: average -10s
every: 10s
units: ms
warn: $this > 500
crit: $this > 1000
info: Average API response time over the last 10 seconds
to: sysadmin
```

## Netdata Cloud Integration

Netdata Cloud provides a centralized view of all your Netdata agents and enables team-based monitoring.

### Connecting to Netdata Cloud

1. Sign up for a free account at [Netdata Cloud](https://app.netdata.cloud)
2. Create a new Space for your team
3. Create a Room for Garazas.art monitoring
4. Get a claim token from the Netdata Cloud interface
5. Update the `.env.production` file with the claim token:
   ```
   NETDATA_CLAIM_TOKEN=your-token
   NETDATA_CLAIM_URL=https://app.netdata.cloud
   NETDATA_CLAIM_ROOMS=your-room-id
   ```
6. Restart the Netdata container:
   ```bash
   docker-compose -f docker-compose.production.yaml restart netdata
   ```

### Team Access

Through Netdata Cloud, you can:

1. Invite team members to your Space
2. Assign roles (Administrator, Troubleshooter, Observer)
3. Share specific Rooms with different team members
4. Set up shared dashboards and alert notifications

## Custom Dashboards

Netdata allows creating custom dashboards to focus on specific metrics important for your application.

### Create a Custom Dashboard

1. Go to the Netdata dashboard
2. Select the charts you want to include
3. Click the "Dashboard" button at the top menu
4. Select "New Dashboard"
5. Drag and drop the charts into the desired layout
6. Save the dashboard

### Recommended Custom Dashboards

We've created the following custom dashboards for Garazas.art:

1. **System Overview**:
   - CPU, Memory, Disk, Network charts
   - Location: `/opt/garazas-art/monitoring/dashboards/system.html`

2. **Application Health**:
   - API response times, error rates, request throughput
   - Location: `/opt/garazas-art/monitoring/dashboards/application.html`

3. **Error Tracking**:
   - HTTP error codes, application errors, slow responses
   - Location: `/opt/garazas-art/monitoring/dashboards/errors.html`

### Accessing Custom Dashboards

```
http://localhost:19999/dashboard.html?dashboard=system
http://localhost:19999/dashboard.html?dashboard=application
http://localhost:19999/dashboard.html?dashboard=errors
```

## Troubleshooting with Netdata

Netdata is a powerful tool for diagnosing issues in real-time.

### Common Scenarios and How to Investigate

#### High Server Load

1. Check the **CPU** chart to see if any specific core is maxed out
2. Look at the **Applications** section to identify which process is consuming CPU
3. Check **Memory** usage to rule out swapping
4. Review **Disk I/O** for potential disk bottlenecks

#### Slow API Responses

1. Check the **API Response Time** chart for patterns
2. Review **Backend Container** CPU and memory usage
3. Look at **Nginx Active Connections** to see if there's a traffic spike
4. Check **Network** charts for potential bandwidth issues
5. Review **Google Sheets API** metrics for external service issues

#### High Error Rates

1. Review **HTTP Status Codes** chart to identify error types
2. Check **Backend Container Logs** for application exceptions
3. Look at **Resource Usage** charts to identify potential resource constraints
4. Review **API Endpoint** charts to see which specific endpoints are failing

#### Memory Leaks

1. Monitor **Memory Usage** charts over time for steady increases
2. Look at **Docker Container** memory charts to identify which container is leaking
3. Check **Container Restarts** count for OOM (Out of Memory) kills
4. Review application logs for memory-related errors

### Using Metrics for Capacity Planning

1. Use the **Average** and **Max** values from system charts to determine resource utilization patterns
2. Review metrics during peak hours to identify potential bottlenecks
3. Monitor growth trends over time (week-over-week, month-over-month)
4. Set up baseline measurements for comparison

## Maintenance and Updates

### Netdata Updates

Netdata is updated through Docker image updates:

```bash
docker-compose -f docker-compose.production.yaml pull netdata
docker-compose -f docker-compose.production.yaml up -d netdata
```

### Backing Up Netdata Configuration

Netdata configurations and custom dashboards are stored in Docker volumes. To back them up:

```bash
# Create backup directory
mkdir -p /opt/garazas-backups/netdata

# Backup Netdata configuration
docker run --rm \
  -v garazas-art_netdata_config:/source:ro \
  -v /opt/garazas-backups/netdata:/backup \
  busybox tar czf /backup/netdata_config_$(date +%Y%m%d).tar.gz -C /source .
```

### Restoring Netdata Configuration

```bash
# Restore from backup
docker run --rm \
  -v garazas-art_netdata_config:/target \
  -v /opt/garazas-backups/netdata:/backup:ro \
  busybox tar xzf /backup/netdata_config_YYYYMMDD.tar.gz -C /target

# Restart Netdata
docker-compose -f docker-compose.production.yaml restart netdata
```

### Log Rotation

Netdata logs are managed by Docker's logging system. Configure log rotation in `/etc/docker/daemon.json`:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Restart Docker after making changes:

```bash
sudo systemctl restart docker
```

## Additional Resources

- [Netdata Documentation](https://learn.netdata.cloud/docs/)
- [Netdata GitHub Repository](https://github.com/netdata/netdata)
- [Netdata Cloud](https://app.netdata.cloud)
- [Netdata Community](https://community.netdata.cloud/)
- [Netdata Blog](https://www.netdata.cloud/blog/) 