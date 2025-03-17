# Exhibitions API

This document provides detailed information about the Exhibitions API endpoints for the Garazas.art platform.

## Table of Contents

- [Overview](#overview)
- [Exhibition Object](#exhibition-object)
- [Endpoints](#endpoints)
  - [List Exhibitions](#list-exhibitions)
  - [Get Exhibition](#get-exhibition)
  - [Create Exhibition](#create-exhibition)
  - [Update Exhibition](#update-exhibition)
  - [Delete Exhibition](#delete-exhibition)
  - [List Exhibition Artists](#list-exhibition-artists)
  - [Add Artist to Exhibition](#add-artist-to-exhibition)
  - [Remove Artist from Exhibition](#remove-artist-from-exhibition)
  - [Upload Exhibition Image](#upload-exhibition-image)
  - [List Exhibition Images](#list-exhibition-images)
  - [Delete Exhibition Image](#delete-exhibition-image)
  - [Featured Exhibitions](#featured-exhibitions)

## Overview

The Exhibitions API allows you to retrieve, create, update, and delete exhibitions. It also provides endpoints for managing artists associated with exhibitions and exhibition images.

## Exhibition Object

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier for the exhibition |
| title | string | Title of the exhibition |
| description | string | Description of the exhibition |
| start_date | string (ISO 8601 date) | Start date of the exhibition |
| end_date | string (ISO 8601 date) | End date of the exhibition |
| location | string | Location of the exhibition |
| status | string | Status of the exhibition (upcoming, active, archived) |
| featured | boolean | Whether the exhibition is featured |
| cover_image_url | string | URL of the cover image |
| images | array | List of image objects associated with the exhibition |
| artists | array | List of artist IDs associated with the exhibition |
| visitor_info | object | Information for visitors (opening hours, admission, etc.) |
| created_at | string (ISO 8601 datetime) | When the exhibition was created |
| updated_at | string (ISO 8601 datetime) | When the exhibition was last updated |

### Example

```json
{
  "id": "ex-123456",
  "title": "Dimensions of Reality",
  "description": "A contemporary exploration of space and form through mixed media installations.",
  "start_date": "2023-09-01",
  "end_date": "2023-10-15",
  "location": "Main Gallery",
  "status": "upcoming",
  "featured": true,
  "cover_image_url": "https://storage.garazas.art/exhibitions/ex-123456/cover.jpg",
  "images": [
    {
      "id": "img-123",
      "url": "https://storage.garazas.art/exhibitions/ex-123456/image1.jpg",
      "caption": "Installation view",
      "order": 1
    },
    {
      "id": "img-124",
      "url": "https://storage.garazas.art/exhibitions/ex-123456/image2.jpg",
      "caption": "Detail of sculpture",
      "order": 2
    }
  ],
  "artists": ["art-789", "art-456"],
  "visitor_info": {
    "opening_hours": "Tuesday-Sunday, 11:00-19:00",
    "admission": "Free entry",
    "opening_reception": "2023-09-01T18:00:00Z"
  },
  "created_at": "2023-08-01T14:22:54Z",
  "updated_at": "2023-08-10T09:15:30Z"
}
```

## Endpoints

### List Exhibitions

Retrieves a list of exhibitions.

```
GET /api/exhibitions
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status (upcoming, active, archived) |
| featured | boolean | Filter featured exhibitions |
| artist_id | string | Filter exhibitions by artist |
| start_date_gte | string (ISO 8601 date) | Filter exhibitions with start date >= value |
| end_date_lte | string (ISO 8601 date) | Filter exhibitions with end date <= value |
| search | string | Search exhibitions by title or description |
| page | integer | Page number (default: 1) |
| limit | integer | Number of items per page (default: 20, max: 100) |
| sort | string | Sort field (default: start_date) |

#### Response

```json
{
  "items": [
    {
      "id": "ex-123456",
      "title": "Dimensions of Reality",
      "description": "A contemporary exploration of space and form through mixed media installations.",
      "start_date": "2023-09-01",
      "end_date": "2023-10-15",
      "location": "Main Gallery",
      "status": "upcoming",
      "featured": true,
      "cover_image_url": "https://storage.garazas.art/exhibitions/ex-123456/cover.jpg",
      "created_at": "2023-08-01T14:22:54Z",
      "updated_at": "2023-08-10T09:15:30Z"
    },
    {
      "id": "ex-123457",
      "title": "Light and Shadow",
      "description": "An immersive experience exploring the interplay of light and shadow through photography and projection.",
      "start_date": "2023-10-20",
      "end_date": "2023-11-30",
      "location": "East Wing",
      "status": "upcoming",
      "featured": false,
      "cover_image_url": "https://storage.garazas.art/exhibitions/ex-123457/cover.jpg",
      "created_at": "2023-08-05T10:18:22Z",
      "updated_at": "2023-08-05T10:18:22Z"
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

### Get Exhibition

Retrieves detailed information about a specific exhibition.

```
GET /api/exhibitions/{exhibition_id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Response

```json
{
  "id": "ex-123456",
  "title": "Dimensions of Reality",
  "description": "A contemporary exploration of space and form through mixed media installations.",
  "start_date": "2023-09-01",
  "end_date": "2023-10-15",
  "location": "Main Gallery",
  "status": "upcoming",
  "featured": true,
  "cover_image_url": "https://storage.garazas.art/exhibitions/ex-123456/cover.jpg",
  "images": [
    {
      "id": "img-123",
      "url": "https://storage.garazas.art/exhibitions/ex-123456/image1.jpg",
      "caption": "Installation view",
      "order": 1
    },
    {
      "id": "img-124",
      "url": "https://storage.garazas.art/exhibitions/ex-123456/image2.jpg",
      "caption": "Detail of sculpture",
      "order": 2
    }
  ],
  "artists": ["art-789", "art-456"],
  "visitor_info": {
    "opening_hours": "Tuesday-Sunday, 11:00-19:00",
    "admission": "Free entry",
    "opening_reception": "2023-09-01T18:00:00Z"
  },
  "created_at": "2023-08-01T14:22:54Z",
  "updated_at": "2023-08-10T09:15:30Z"
}
```

### Create Exhibition

Creates a new exhibition.

```
POST /api/exhibitions
```

#### Authentication

Requires admin JWT authentication.

#### Request Body

```json
{
  "title": "New Horizons",
  "description": "An exhibition exploring emerging trends in digital art.",
  "start_date": "2023-11-01",
  "end_date": "2023-12-15",
  "location": "West Gallery",
  "status": "upcoming",
  "featured": false,
  "artists": ["art-123", "art-456"],
  "visitor_info": {
    "opening_hours": "Tuesday-Sunday, 11:00-19:00",
    "admission": "Free entry",
    "opening_reception": "2023-11-01T18:00:00Z"
  }
}
```

#### Response

```json
{
  "id": "ex-123458",
  "title": "New Horizons",
  "description": "An exhibition exploring emerging trends in digital art.",
  "start_date": "2023-11-01",
  "end_date": "2023-12-15",
  "location": "West Gallery",
  "status": "upcoming",
  "featured": false,
  "cover_image_url": null,
  "images": [],
  "artists": ["art-123", "art-456"],
  "visitor_info": {
    "opening_hours": "Tuesday-Sunday, 11:00-19:00",
    "admission": "Free entry",
    "opening_reception": "2023-11-01T18:00:00Z"
  },
  "created_at": "2023-08-15T09:30:22Z",
  "updated_at": "2023-08-15T09:30:22Z"
}
```

### Update Exhibition

Updates an existing exhibition.

```
PUT /api/exhibitions/{exhibition_id}
```

#### Authentication

Requires admin JWT authentication.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Request Body

```json
{
  "title": "New Horizons: Digital Frontiers",
  "description": "An exhibition exploring emerging trends in digital art and virtual reality.",
  "start_date": "2023-11-01",
  "end_date": "2023-12-15",
  "location": "West Gallery",
  "status": "upcoming",
  "featured": true,
  "visitor_info": {
    "opening_hours": "Tuesday-Sunday, 10:00-20:00",
    "admission": "Free entry",
    "opening_reception": "2023-11-01T18:00:00Z"
  }
}
```

#### Response

```json
{
  "id": "ex-123458",
  "title": "New Horizons: Digital Frontiers",
  "description": "An exhibition exploring emerging trends in digital art and virtual reality.",
  "start_date": "2023-11-01",
  "end_date": "2023-12-15",
  "location": "West Gallery",
  "status": "upcoming",
  "featured": true,
  "cover_image_url": null,
  "images": [],
  "artists": ["art-123", "art-456"],
  "visitor_info": {
    "opening_hours": "Tuesday-Sunday, 10:00-20:00",
    "admission": "Free entry",
    "opening_reception": "2023-11-01T18:00:00Z"
  },
  "created_at": "2023-08-15T09:30:22Z",
  "updated_at": "2023-08-15T10:45:18Z"
}
```

### Delete Exhibition

Deletes an exhibition.

```
DELETE /api/exhibitions/{exhibition_id}
```

#### Authentication

Requires admin JWT authentication.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Response

```
204 No Content
```

### List Exhibition Artists

Retrieves the list of artists associated with an exhibition.

```
GET /api/exhibitions/{exhibition_id}/artists
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Response

```json
{
  "items": [
    {
      "id": "art-123",
      "name": "Jane Smith",
      "bio": "Contemporary visual artist based in Berlin",
      "profile_image_url": "https://storage.garazas.art/artists/art-123/profile.jpg"
    },
    {
      "id": "art-456",
      "name": "Mark Johnson",
      "bio": "Digital artist and VR designer",
      "profile_image_url": "https://storage.garazas.art/artists/art-456/profile.jpg"
    }
  ]
}
```

### Add Artist to Exhibition

Associates an artist with an exhibition.

```
POST /api/exhibitions/{exhibition_id}/artists
```

#### Authentication

Requires admin JWT authentication.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Request Body

```json
{
  "artist_id": "art-789"
}
```

#### Response

```
204 No Content
```

### Remove Artist from Exhibition

Removes an artist association from an exhibition.

```
DELETE /api/exhibitions/{exhibition_id}/artists/{artist_id}
```

#### Authentication

Requires admin JWT authentication.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |
| artist_id | string | The ID of the artist |

#### Response

```
204 No Content
```

### Upload Exhibition Image

Uploads an image for an exhibition.

```
POST /api/exhibitions/{exhibition_id}/images
```

#### Authentication

Requires admin JWT authentication.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Request Body

Multipart form data:

| Field | Type | Description |
|-------|------|-------------|
| image | file | The image file (JPEG or PNG) |
| caption | string | Caption for the image |
| order | integer | Display order of the image |
| is_cover | boolean | Whether this image should be the cover image |

#### Response

```json
{
  "id": "img-125",
  "url": "https://storage.garazas.art/exhibitions/ex-123458/image1.jpg",
  "caption": "Exhibition entrance",
  "order": 1,
  "created_at": "2023-08-15T11:20:45Z"
}
```

### List Exhibition Images

Retrieves the list of images associated with an exhibition.

```
GET /api/exhibitions/{exhibition_id}/images
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |

#### Response

```json
{
  "items": [
    {
      "id": "img-125",
      "url": "https://storage.garazas.art/exhibitions/ex-123458/image1.jpg",
      "caption": "Exhibition entrance",
      "order": 1,
      "created_at": "2023-08-15T11:20:45Z"
    },
    {
      "id": "img-126",
      "url": "https://storage.garazas.art/exhibitions/ex-123458/image2.jpg",
      "caption": "Main installation",
      "order": 2,
      "created_at": "2023-08-15T11:22:30Z"
    }
  ]
}
```

### Delete Exhibition Image

Deletes an image from an exhibition.

```
DELETE /api/exhibitions/{exhibition_id}/images/{image_id}
```

#### Authentication

Requires admin JWT authentication.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exhibition_id | string | The ID of the exhibition |
| image_id | string | The ID of the image |

#### Response

```
204 No Content
```

### Featured Exhibitions

Retrieves a list of featured exhibitions.

```
GET /api/exhibitions/featured
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| limit | integer | Number of items (default: 5, max: 10) |

#### Response

```json
{
  "items": [
    {
      "id": "ex-123456",
      "title": "Dimensions of Reality",
      "description": "A contemporary exploration of space and form through mixed media installations.",
      "start_date": "2023-09-01",
      "end_date": "2023-10-15",
      "location": "Main Gallery",
      "status": "upcoming",
      "featured": true,
      "cover_image_url": "https://storage.garazas.art/exhibitions/ex-123456/cover.jpg",
      "created_at": "2023-08-01T14:22:54Z",
      "updated_at": "2023-08-10T09:15:30Z"
    },
    {
      "id": "ex-123458",
      "title": "New Horizons: Digital Frontiers",
      "description": "An exhibition exploring emerging trends in digital art and virtual reality.",
      "start_date": "2023-11-01",
      "end_date": "2023-12-15",
      "location": "West Gallery",
      "status": "upcoming",
      "featured": true,
      "cover_image_url": "https://storage.garazas.art/exhibitions/ex-123458/cover.jpg",
      "created_at": "2023-08-15T09:30:22Z",
      "updated_at": "2023-08-15T10:45:18Z"
    }
  ]
}
```

## Error Responses

### Exhibition Not Found

```json
{
  "detail": "Exhibition not found",
  "code": "NOT_FOUND",
  "timestamp": "2023-08-15T14:30:22Z"
}
```

### Validation Error

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

### Authentication Error

```json
{
  "detail": "Invalid authentication credentials",
  "code": "INVALID_CREDENTIALS",
  "timestamp": "2023-08-15T14:35:10Z"
}
``` 