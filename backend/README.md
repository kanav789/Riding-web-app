# Backend API Documentation


## 1. Captain Endpoints

### 1.1 Register Captain
Register a new captain in the system.

**HTTP Method:** `POST`  
**Endpoint:** `/api/captain/register`  
**Content-Type:** `application/json`

#### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "model": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

#### Validation Rules
- **email**: Must be a valid email address
- **fullname.firstname**: Minimum 3 characters
- **password**: Minimum 8 characters
- **vehicle.color**: Minimum 3 characters
- **vehicle.model**: Minimum 3 characters
- **vehicle.capacity**: Must be an integer greater than or equal to 1
- **vehicle.vehicleType**: Must be one of: "car", "bike", "auto"

#### Example Request
```http
POST /api/captain/register HTTP/1.1
Host: your-api-domain.com
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Smith"
  },
  "email": "john.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "black",
    "model": "Toyota Camry",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "black",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
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

##### Required Fields Missing
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "error": "All fields are required"
}
```

#### CURL Example
```bash
curl -X POST \
  http://your-api-domain.com/api/captain/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "password": "password123",
    "vehicle": {
      "color": "black",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

### Notes
- Password is hashed before storing in the database
- The password field is excluded from the response
- All requests must include `Content-Type: application/json` header
- Vehicle type must be one of the predefined types: car, bike, or auto

### 1.2 Login Captain
Authenticate an existing captain and receive a JWT token.

**HTTP Method:** `POST`  
**Endpoint:** `/api/captain/login`  
**Content-Type:** `application/json`

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation Rules
- **email**: Must be a valid email address
- **password**: Minimum 8 characters

#### Example Request
```http
POST /api/captain/login HTTP/1.1
Host: your-api-domain.com
Content-Type: application/json

{
  "email": "john.smith@example.com",
  "password": "password123"
}
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "message": "Login successful",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "black",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "JWT_TOKEN"
}
```

#### Error Responses

##### Invalid Credentials
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "message": "Invalid email or password"
}
```

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
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

#### CURL Example
```bash
curl -X POST \
  http://your-api-domain.com/api/captain/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john.smith@example.com",
    "password": "password123"
  }'
```

### Notes
- Password is compared with hashed version in database
- JWT token is generated upon successful authentication
- The password field is never returned in the response
- All requests must include `Content-Type: application/json` header

### 1.3 Get Captain Profile
Get the authenticated captain's profile information.

**HTTP Method:** `GET`  
**Endpoint:** `/api/captain/profile`  
**Authentication:** Required (JWT Token)

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "message": "Captain profile fetched successfully",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "black",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Response
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

#### CURL Example
```bash
curl -X GET \
  http://your-api-domain.com/api/captain/profile \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Password field is excluded from response
- Token must not be blacklisted

### 1.4 Logout Captain
Logout the currently authenticated captain and invalidate their token.

**HTTP Method:** `GET`  
**Endpoint:** `/api/captain/logout`  
**Authentication:** Required (JWT Token)

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "message": "Captain logged out successfully"
}
```

#### Error Responses

##### No Token Provided
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

##### Invalid Token
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Invalid token"
}
```

#### CURL Example
```bash
curl -X GET \
  http://your-api-domain.com/api/captain/logout \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Clears the token cookie if present
- Adds the token to blacklist to prevent reuse
- Token expires from blacklist after 24 hours automatically

---

## 2. User Endpoints

### 2.1 Register User
Register a new user in the system.

**HTTP Method:** `POST`  
**Endpoint:** `/api/register`  
**Content-Type:** `application/json`

#### Request Body
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

#### Validation Rules
- **email**: Must be a valid email address
- **fullname.firstname**: Minimum 3 characters
- **password**: Minimum 6 characters
- **fullname.lastname**: Optional, but if provided must be minimum 3 characters

#### Example Request
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

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
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

#### Error Responses

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
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

##### Required Fields Missing
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "error": "All fields are required"
}
```

#### CURL Example
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

### 2.2 Login User
Authenticate an existing user and receive a JWT token.

**HTTP Method:** `POST`  
**Endpoint:** `/api/login`  
**Content-Type:** `application/json`

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation Rules
- **email**: Must be a valid email address
- **password**: Minimum 6 characters

#### Example Request
```http
POST /api/login HTTP/1.1
Host: your-api-domain.com
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
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

#### Error Responses

##### Invalid Credentials
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Invalid email or password"
}
```

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
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

#### CURL Example
```bash
curl -X POST \
  http://your-api-domain.com/api/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Notes
- Password is compared with hashed version in database
- JWT token is generated upon successful authentication
- The password field is never returned in the response
- All requests must include `Content-Type: application/json` header

### 2.3 Get User Profile
Get the authenticated user's profile information.

**HTTP Method:** `GET`  
**Endpoint:** `/api/profile`  
**Authentication:** Required (JWT Token)

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### Error Response
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

#### CURL Example
```bash
curl -X GET \
  http://your-api-domain.com/api/profile \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Password field is excluded from response
- Token must not be blacklisted

### 2.4 Logout User
Logout the currently authenticated user and invalidate their token.

**HTTP Method:** `GET`  
**Endpoint:** `/api/logout`  
**Authentication:** Required (JWT Token)

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "message": "Logout successful"
}
```

#### Error Responses

##### No Token Provided
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

##### Invalid Token
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Invalid token"
}
```

#### CURL Example
```bash
curl -X GET \
  http://your-api-domain.com/api/logout \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Clears the token cookie if present
- Adds the token to blacklist to prevent reuse
- Token expires from blacklist after 24 hours automatically

---

## 3. Map Endpoints

### 3.1 Get Coordinate

Get the latitude and longitude for a given address.

**HTTP Method:** `GET`  
**Endpoint:** `/api/map/getCoordinate`  
**Authentication:** Required (JWT Token)

#### Query Parameters
- **address** (string, minimum 3 characters): The address to geocode.

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "latitude": "number",
  "longitude": "number"
}
```

#### Error Responses

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "errors": [
    {
      "msg": "Invalid address",
      "param": "address",
      "location": "query"
    }
  ]
}
```

##### Authentication Error
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

#### CURL Example
```bash
curl -X GET \
  'http://your-api-domain.com/api/map/getCoordinate?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Address must be a valid string with a minimum of 3 characters

### 3.2 Get Distance

Get the distance and estimated time between two locations.

**HTTP Method:** `GET`  
**Endpoint:** `/api/map/getdistance`  
**Authentication:** Required (JWT Token)

#### Query Parameters
- **origin** (string, minimum 3 characters): The starting address.
- **destination** (string, minimum 3 characters): The destination address.

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "distance": "string",
  "duration": "string"
}
```

#### Error Responses

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "errors": [
    {
      "msg": "Invalid origin or destination",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

##### Authentication Error
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

#### CURL Example
```bash
curl -X GET \
  'http://your-api-domain.com/api/map/getdistance?origin=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Both origin and destination must be valid strings with a minimum of 3 characters

### 3.3 Get Suggestions

Get address suggestions based on input.

**HTTP Method:** `GET`  
**Endpoint:** `/api/map/getSuggestions`  
**Authentication:** Required (JWT Token)

#### Query Parameters
- **input** (string, minimum 3 characters): The input string to get suggestions for.

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `200 OK`  
**Content-Type:** `application/json`
```json
{
  "suggestions": [
    {
      "description": "string",
      "place_id": "string"
    }
  ]
}
```

#### Error Responses

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "errors": [
    {
      "msg": "Invalid input",
      "param": "input",
      "location": "query"
    }
  ]
}
```

##### Authentication Error
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

#### CURL Example
```bash
curl -X GET \
  'http://your-api-domain.com/api/map/getSuggestions?input=1600+Amphitheatre' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Notes
- Requires valid JWT token in Authorization header
- Input must be a valid string with a minimum of 3 characters

## 4. Ride Endpoints

### 4.1 Create Ride
Create a new ride request.

**HTTP Method:** `POST`  
**Endpoint:** `/api/ride/create`  
**Authentication:** Required (JWT Token)

#### Request Body
```json
{
  "pickup": "string",
  "destination": "string",
  "vehicleType": "string"
}
```

#### Validation Rules
- **pickup**: Must be a valid string with a minimum of 3 characters
- **destination**: Must be a valid string with a minimum of 3 characters
- **vehicleType**: Must be one of: "auto", "motorcycle", "car"

#### Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response
**HTTP Status:** `201 Created`  
**Content-Type:** `application/json`
```json
{
  "ride": {
    "_id": "ride_id",
    "user": "user_id",
    "pickup": "string",
    "destination": "string",
    "vehicleType": "string",
    "status": "Pending"
  }
}
```

#### Error Responses

##### Validation Error
**HTTP Status:** `400 Bad Request`  
**Content-Type:** `application/json`
```json
{
  "errors": [
    {
      "msg": "Invalid Pickup Location",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

##### Authentication Error
**HTTP Status:** `401 Unauthorized`  
**Content-Type:** `application/json`
```json
{
  "message": "Authentication required"
}
```

#### CURL Example
```bash
curl -X POST \
  http://your-api-domain.com/api/ride/create \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "vehicleType": "car"
  }'
```

### Notes
- Requires valid JWT token in Authorization header
- Pickup and destination must be valid strings with a minimum of 3 characters
- Vehicle type must be one of the predefined types: auto, motorcycle, or car
