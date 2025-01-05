
# Backend API Documentation

## User Registration API Documentation

### API Endpoints

### Authentication

#### Register User
Register a new user in the system.

**HTTP Method**: `POST`  
**Endpoint**: `/api/register`  
**Content-Type**: `application/json`

### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules
- **email**: Must be a valid email address
- **fullname.firstname**: Minimum 3 characters
- **password**: Minimum 6 characters
- **fullname.lastname**: Optional, but if provided must be minimum 3 characters

### Example Request
```http
POST /api/register HTTP/1.1
Host: your-api-domain.com
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response
**HTTP Status**: `200 OK`  
**Content-Type**: `application/json`
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "JWT_TOKEN"
}
```

### Error Responses

#### Validation Error
**HTTP Status**: `400 Bad Request`  
**Content-Type**: `application/json`
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Required Fields Missing
**HTTP Status**: `400 Bad Request`  
**Content-Type**: `application/json`
```json
{
  "error": "All fields are required"
}
```

### CURL Example
```bash
curl -X POST \
  http://your-api-domain.com/api/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Notes
- Password is hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- The password field is excluded from the response
- All requests must include `Content-Type: application/json` header
````

Changes made:
1. Added HTTP method specification
2. Added Content-Type headers
3. Added detailed HTTP request example
4. Added CURL example for API testing
5. Added more specific HTTP status codes
6. Improved formatting for better readability
7. Added headers information in the documentation


