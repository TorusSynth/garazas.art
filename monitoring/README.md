# Netdata Monitoring for Garazas.art

This document provides information on how to use and interpret the Netdata monitoring system that has been set up for the Garazas.art application.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Accessing the Dashboard](#accessing-the-dashboard)
- [Dashboard Overview](#dashboard-overview)
- [Interpreting Metrics](#interpreting-metrics)
- [Alerts and Notifications](#alerts-and-notifications)
- [Custom Dashboards](#custom-dashboards)
- [Troubleshooting](#troubleshooting)
- [References](#references)

## Setup and Installation

### Initial Setup

1. Make sure Docker and Docker Compose are installed on your system.
2. Run the setup script to prepare the monitoring environment:
   ```
   ./monitoring/setup-netdata.sh
   ```
3. Copy the `monitoring/netdata.env.example` to `monitoring/netdata.env` if it doesn't exist already:
   ```
   cp monitoring/netdata.env.example monitoring/netdata.env
   ```
4. Edit `monitoring/netdata.env` and set your Netdata Cloud token (optional but recommended).
5. Start the monitoring service:
   ```
   docker-compose up -d netdata
   ```

### Netdata Cloud Integration (Optional)

For team access and advanced features:

1. Create an account at [Netdata Cloud](https://app.netdata.cloud/).
2. Generate a claim token in your Netdata Cloud account.
3. Add the token to `monitoring/netdata.env`.
4. Restart the Netdata container:
   ```
   docker-compose restart netdata
   ```

## Accessing the Dashboard

### Local Access

- Open your web browser and navigate to: `http://localhost:19999`
- If authentication is enabled, log in with the credentials specified in `netdata.env`

### Remote Access

For secure remote access, we recommend using Netdata Cloud or setting up a reverse proxy with SSL:

1. Access through Netdata Cloud: https://app.netdata.cloud/
2. Or set up an Nginx reverse proxy with SSL in front of Netdata.

## Dashboard Overview

The main dashboard provides the following sections:

### System Overview

- CPU usage and load
- Memory usage and swap
- Disk I/O and space
- Network traffic

### Application Metrics

- Container resources (frontend, backend, nginx)
- API endpoint health and response times
- Error rates and performance

### Custom Dashboards

- Application-specific metrics
- Service health metrics
- Performance metrics

## Interpreting Metrics

### CPU Usage

- **What it shows**: Percentage of CPU used by the system and each container
- **Normal range**: Below 70%
- **Warning threshold**: Above 70%
- **Critical threshold**: Above 85%
- **What to check if high**: 
  - Background processes
  - API endpoints with high load
  - Database queries
  - Application bottlenecks

### Memory Usage

- **What it shows**: RAM usage by the system and each container
- **Normal range**: Below 70% of available RAM
- **Warning threshold**: Above 70%
- **Critical threshold**: Above 85%
- **What to check if high**:
  - Memory leaks
  - Caching configuration
  - Application memory limits

### API Response Times

- **What it shows**: Response time for API endpoints
- **Normal range**: Below 200ms
- **Warning threshold**: Above 500ms
- **Critical threshold**: Above 1000ms
- **What to check if high**:
  - Database queries
  - External service calls
  - Application code efficiency
  - Server resources

### Error Rates

- **What it shows**: Error count per minute
- **Normal range**: Close to 0
- **Warning threshold**: Above 5 errors per minute
- **Critical threshold**: Above 10 errors per minute
- **What to check if high**:
  - Application logs
  - API endpoint issues
  - Database connectivity
  - External service dependencies

## Alerts and Notifications

### Configured Alerts

The following alerts are configured:

1. **System Resources**:
   - High CPU usage
   - High memory usage
   - Low disk space
   - High network traffic

2. **Application Health**:
   - API endpoint availability
   - Container health
   - Response time degradation
   - Error rate increase

3. **Database (if applicable)**:
   - Connection pool exhaustion
   - Query performance

### Notification Methods

Alerts can be delivered via:

- Email: Configured for admin@garazas.art
- Slack: Configured for #monitoring channel
- Additional methods can be added in `health_alarm_notify.conf`

### Managing Alerts

To acknowledge or silence alerts:

1. In the dashboard, navigate to the "Alerts" tab
2. Find the alert you want to manage
3. Use the dropdown menu to silence or acknowledge

## Custom Dashboards

### Available Dashboards

1. **System Overview**: General system health and resources
2. **Application Performance**: API response times and error rates
3. **Container Resources**: Docker container resource usage
4. **Network Traffic**: Inbound and outbound network traffic

### Creating Custom Dashboards

To create a custom dashboard:

1. Navigate to the main dashboard
2. Select the metrics you want to include
3. Click on "Add to custom dashboard"
4. Name and save your dashboard

## Troubleshooting

### Common Issues

1. **Netdata not showing data**:
   - Check if the container is running: `docker-compose ps netdata`
   - Check container logs: `docker-compose logs netdata`
   - Verify volume mounts and permissions

2. **High resource usage**:
   - Adjust history and memory mode in `netdata.env`
   - Disable unnecessary collectors in `netdata.conf`

3. **Authentication issues**:
   - Recreate the password file using the setup script
   - Check the `netdata.conf` authentication settings

### Logs

Netdata logs are available:

- In the container: `docker-compose exec netdata cat /var/log/netdata/error.log`
- Through the dashboard: Navigate to "Logs" in the settings menu

## References

- [Netdata Documentation](https://learn.netdata.cloud/)
- [Netdata GitHub Repository](https://github.com/netdata/netdata)
- [Docker Monitoring Best Practices](https://learn.netdata.cloud/docs/agent/packaging/docker)
- [Alert Configuration Guide](https://learn.netdata.cloud/docs/monitor/configure-alarms)
- [Custom Dashboard Guide](https://learn.netdata.cloud/docs/dashboard/customize) 