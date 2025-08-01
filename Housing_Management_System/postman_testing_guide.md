# Housing Management System - Postman Testing Guide

## Base URL
```
http://localhost:8080
```

## Authentication Endpoints

### 1. Register Admin User
**POST** `/auth/register`
```json
{
  "name": "Test Admin",
  "email": "admin@example.com",
  "phone": "1234567890",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "ADMIN",
  "societyCreationRequest": {
    "name": "Test Society",
    "address": "Test Address",
    "city": "Test City",
    "state": "Test State",
    "pincode": "123456"
  }
}
```

### 2. Register Resident User
**POST** `/auth/register`
```json
{
  "name": "Test Resident",
  "email": "resident@example.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "RESIDENT",
  "societyId": 1
}
```

### 3. Register Guard User
**POST** `/auth/register`
```json
{
  "name": "Test Guard",
  "email": "guard@example.com",
  "phone": "5555555555",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "GUARD",
  "societyId": 1
}
```

### 4. Login
**POST** `/auth/login`
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response will include JWT token:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "expiresIn": 1800000,
  "userId": 1,
  "name": "Test Admin",
  "email": "admin@example.com",
  "role": "ADMIN",
  "societyId": 1,
  "societyName": "Test Society"
}
```

## Society Management

### 5. Get All Societies
**GET** `/api/societies`
**Headers:** `Authorization: Bearer {token}`

### 6. Get Society by ID
**GET** `/api/societies/{id}`
**Headers:** `Authorization: Bearer {token}`

### 7. Update Society
**PUT** `/api/societies/{id}`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "name": "Updated Society Name",
  "address": "Updated Address",
  "city": "Updated City",
  "state": "Updated State",
  "pincode": "654321",
  "numberOfBuildings": 5
}
```

### 8. Delete Society
**DELETE** `/api/societies/{id}`
**Headers:** `Authorization: Bearer {token}`

## Building Management

### 9. Create Building
**POST** `/api/buildings`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "name": "Building A",
  "totalFloors": 10,
  "societyId": 1
}
```

### 10. Get All Buildings
**GET** `/api/buildings`
**Headers:** `Authorization: Bearer {token}`

### 11. Get Building by ID
**GET** `/api/buildings/{id}`
**Headers:** `Authorization: Bearer {token}`

### 12. Update Building
**PUT** `/api/buildings/{id}`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "name": "Updated Building A",
  "totalFloors": 12,
  "societyId": 1
}
```

### 13. Delete Building
**DELETE** `/api/buildings/{id}`
**Headers:** `Authorization: Bearer {token}`

## Flat Management

### 14. Create Flat
**POST** `/api/flats`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "flatNumber": "A-101",
  "floorNumber": 1,
  "flatType": "TWO_BHK",
  "area": 1200.0,
  "buildingId": 1
}
```

### 15. Get All Flats
**GET** `/api/flats`
**Headers:** `Authorization: Bearer {token}`

### 16. Get Flat by ID
**GET** `/api/flats/{id}`
**Headers:** `Authorization: Bearer {token}`

### 17. Update Flat
**PUT** `/api/flats/{id}`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "flatNumber": "A-101",
  "floorNumber": 1,
  "flatType": "THREE_BHK",
  "area": 1500.0,
  "buildingId": 1
}
```

### 18. Delete Flat
**DELETE** `/api/flats/{id}`
**Headers:** `Authorization: Bearer {token}`

## Flat Allocation

### 19. Create Flat Allocation
**POST** `/api/flat-allocations`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "userId": 2,
  "flatId": 1,
  "residentType": "OWNER",
  "occupation": "Software Engineer",
  "familyMembers": 4
}
```

### 20. Get All Flat Allocations
**GET** `/api/flat-allocations`
**Headers:** `Authorization: Bearer {token}`

### 21. Update Allocation Status
**PUT** `/api/flat-allocations/{id}/status`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "status": "APPROVED"
}
```

## Notice Management

### 22. Create Notice
**POST** `/api/notices`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "title": "Important Notice",
  "content": "This is an important notice for all residents.",
  "priority": "HIGH",
  "societyId": 1,
  "expiresAt": "2024-12-31T23:59:59"
}
```

### 23. Get All Notices
**GET** `/api/notices`
**Headers:** `Authorization: Bearer {token}`

### 24. Get Notice by ID
**GET** `/api/notices/{id}`
**Headers:** `Authorization: Bearer {token}`

### 25. Update Notice
**PUT** `/api/notices/{id}`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "title": "Updated Notice",
  "content": "This is an updated notice.",
  "priority": "NORMAL",
  "societyId": 1,
  "expiresAt": "2024-12-31T23:59:59"
}
```

### 26. Delete Notice
**DELETE** `/api/notices/{id}`
**Headers:** `Authorization: Bearer {token}`

## Complaint Management

### 27. Create Complaint
**POST** `/api/complaints`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "title": "Water Issue",
  "description": "No water supply in flat A-101",
  "category": "MAINTENANCE",
  "flatId": 1
}
```

### 28. Get All Complaints
**GET** `/api/complaints`
**Headers:** `Authorization: Bearer {token}`

### 29. Get Complaint by ID
**GET** `/api/complaints/{id}`
**Headers:** `Authorization: Bearer {token}`

### 30. Update Complaint Status
**PUT** `/api/complaints/{id}/status`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "status": "IN_PROGRESS",
  "resolution": "Technician has been assigned to fix the issue."
}
```

### 31. Resolve Complaint
**PUT** `/api/complaints/{id}/resolve`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "resolution": "Water supply has been restored."
}
```

## Visitor Management

### 32. Register Visitor
**POST** `/api/visitors`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "name": "John Doe",
  "phone": "1111111111",
  "purpose": "Meeting with resident",
  "flatId": 1
}
```

### 33. Get All Visitors
**GET** `/api/visitors`
**Headers:** `Authorization: Bearer {token}`

### 34. Get Visitor by ID
**GET** `/api/visitors/{id}`
**Headers:** `Authorization: Bearer {token}`

### 35. Approve Visitor
**PUT** `/api/visitors/{id}/approve`
**Headers:** `Authorization: Bearer {token}`

### 36. Record Visitor Exit
**PUT** `/api/visitors/{id}/exit`
**Headers:** `Authorization: Bearer {token}`

## User Management

### 37. Get All Users
**GET** `/api/users`
**Headers:** `Authorization: Bearer {token}`

### 38. Get User by ID
**GET** `/api/users/{id}`
**Headers:** `Authorization: Bearer {token}`

### 39. Update User
**PUT** `/api/users/{id}`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "name": "Updated User Name",
  "email": "updated@example.com",
  "phone": "9999999999",
  "role": "RESIDENT",
  "societyId": 1
}
```

### 40. Delete User
**DELETE** `/api/users/{id}`
**Headers:** `Authorization: Bearer {token}`

## Testing Scenarios

### Scenario 1: Complete Admin Workflow
1. Register Admin → Login → Create Society → Create Building → Create Flat → Create Notice

### Scenario 2: Resident Workflow
1. Register Resident → Login → Create Complaint → View Notices → Register Visitor

### Scenario 3: Guard Workflow
1. Register Guard → Login → View Visitors → Approve/Reject Visitors → Record Exit

### Scenario 4: Error Testing
1. Try to register with existing email
2. Try to login with wrong password
3. Try to access protected endpoints without token
4. Try to access admin endpoints with resident role

## Environment Variables
Create a Postman environment with these variables:
- `baseUrl`: http://localhost:8080
- `adminToken`: (store after admin login)
- `residentToken`: (store after resident login)
- `guardToken`: (store after guard login)
- `societyId`: (store after society creation)
- `buildingId`: (store after building creation)
- `flatId`: (store after flat creation)

## Test Scripts
Add these test scripts to your requests:

### For Login Response:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("adminToken", response.token);
    pm.environment.set("societyId", response.societyId);
}
```

### For Creation Responses:
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("buildingId", response.id);
}
```