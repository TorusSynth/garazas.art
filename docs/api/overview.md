# API Documentation

This document provides comprehensive documentation for the Garazas.art API.

## Table of Contents

- [API Overview](#api-overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Data Formats](#data-formats)
- [Resource Categories](#resource-categories)
- [Versioning](#versioning)
- [CORS](#cors)

## API Overview

The Garazas.art API is a RESTful API built with FastAPI that provides access to exhibitions, events, artists, and other data related to the art gallery platform. It follows RESTful principles and uses standard HTTP methods for operations.

## Base URL

- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.garazas.art/api`

## Authentication

### API Key Authentication

For public endpoints with rate limiting, use API key authentication:

```
GET /api/exhibitions
Authorization: ApiKey your-api-key-here
```

### JWT Authentication (Admin Access)

For secured endpoints (admin operations), use JWT Bearer authentication:

```
POST /api/exhibitions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Obtaining Authentication Tokens

Admin users can obtain JWT tokens by authenticating through:

```
POST /api/auth/token
Content-Type: application/x-www-form-urlencoded

username=admin&password=yourpassword
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages in JSON format:

```json
{
  "detail": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "timestamp": "2023-06-15T12:34:56Z"
}
```

### Common Error Codes

| Status Code | Meaning | Example Scenario |
|-------------|---------|------------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but insufficient permissions |
| 404 | Not Found | Resource does not exist |
| 422 | Validation Error | Request data fails validation |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |

### Validation Errors

Validation errors return a 422 status code with detailed information about each validation error:

```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    },
    {
      "loc": ["body", "start_date"],
      "msg": "invalid date format",
      "type": "value_error.date"
    }
  ]
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:

- **Public API**: 60 requests per minute
- **Authenticated API**: 100 requests per minute

Rate limit information is included in response headers:

```
X-Rate-Limit-Limit: 60
X-Rate-Limit-Remaining: 58
X-Rate-Limit-Reset: 1623761435
```

When a rate limit is exceeded, the API responds with a 429 status code.

## Data Formats

### Request Format

For POST, PUT, and PATCH requests, the API accepts data in JSON format:

```
Content-Type: application/json
```

### Response Format

All API responses are in JSON format:

```
Content-Type: application/json
```

### Dates and Times

- All dates and times are in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`
- All times are in UTC unless otherwise specified

### Pagination

List endpoints support pagination with the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 20, max: 100)

Paginated responses include metadata:

```json
{
  "items": [...],
  "pagination": {
    "total": 100,
    "page": 2,
    "limit": 20,
    "pages": 5
  }
}
```

### Filtering

List endpoints support filtering with query parameters. Examples:

```
GET /api/exhibitions?status=active
GET /api/events?start_date_gte=2023-06-01&end_date_lte=2023-06-30
```

### Sorting

List endpoints support sorting with the `sort` query parameter:

```
GET /api/exhibitions?sort=start_date
GET /api/exhibitions?sort=-created_at  (descending order)
```

## Resource Categories

The API provides the following resource categories:

1. **Exhibitions**: Art exhibitions hosted at the gallery
2. **Events**: Events related to exhibitions or the gallery
3. **Artists**: Artist profiles and information
4. **Open Calls**: Open call submissions and management
5. **Admin**: Administrative operations (secured)

Detailed documentation for each category is available in separate documents:

- [Exhibitions API](./exhibitions.md)
- [Events API](./events.md)
- [Artists API](./artists.md)
- [Open Calls API](./open-calls.md)
- [Admin API](./admin.md)

## Versioning

The API uses URL versioning:

```
/api/v1/exhibitions
```

The current version is v1. When new incompatible changes are introduced, a new version will be released while maintaining support for older versions for a deprecation period.

## CORS

The API supports Cross-Origin Resource Sharing (CORS) for integration with web applications:

- **Development**: All origins are allowed
- **Production**: Only the official Garazas.art domain and subdomains are allowed

## API Client Libraries

We provide official client libraries for integrating with the API:

- [JavaScript/TypeScript Client](https://github.com/garazas-art/api-client-js)
- [Python Client](https://github.com/garazas-art/api-client-python)

## Examples

### Fetching Exhibitions

```bash
curl -X GET "https://api.garazas.art/api/exhibitions" \
  -H "Accept: application/json" \
  -H "Authorization: ApiKey your-api-key-here"
```

### Creating a New Exhibition (Admin)

```bash
curl -X POST "https://api.garazas.art/api/exhibitions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "New Exhibition",
    "description": "Exhibition description",
    "start_date": "2023-07-01",
    "end_date": "2023-07-31",
    "location": "Main Gallery",
    "status": "upcoming",
    "featured": true,
    "artists": ["artist-id-1", "artist-id-2"]
  }'
```

## Support

For API support or to report issues, please contact:

- Email: api-support@garazas.art
- GitHub Issues: [https://github.com/garazas-art/api/issues](https://github.com/garazas-art/api/issues) 