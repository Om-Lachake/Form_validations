# Full Stack Form Validation App

## Overview
This project is a full-stack application with:
- **Frontend:** React + TypeScript
- **Backend:** Express + TypeScript
- **Database:** MongoDB

It includes:
- Form validation (client-side + server-side)
- Debounced email availability check
- Clean UI with modern UX patterns

---

## Features

### Frontend
- Controlled form inputs
- Debounced validation using custom hook
- Real-time error handling
- Email availability check via API
- Success and error states
- Touched-based validation UX

### Backend
- REST API with Express
- MongoDB integration
- Duplicate email handling
- Proper error handling

---

## Project Structure

```
/frontend
  /components
  /hooks
  /utils
  /types

/backend
  /src
    /models
    /utils
    /types
    server.ts
```

---

## API Endpoints

### 1. Add User
**POST** `/api/addUser`

Request:
```
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Responses:
- 201: User added
- 409: Email already exists
- 400: Validation error

---

### 2. Check User Email
**POST** `/api/lookUser`

Request:
```
{
  "email": "john@example.com"
}
```

Responses:
- 200: Email available
- 401: Email already exists

---

## Frontend Logic

### Debounce Hook
- Prevents excessive API calls
- Waits 500ms after user stops typing

### Validation Flow
1. User types input
2. Debounced values trigger validation
3. If valid → API call to check email
4. Errors shown only after field is touched

---

## Installation

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## Environment Setup

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_connection_string
```

---

## Future Improvements
- Add loading spinner during API calls
- Use React Hook Form or Zod
- Add authentication
- Improve accessibility (ARIA)

---

## Author
Om Lachake
