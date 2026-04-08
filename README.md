# Full Stack Form Validation App

## 🚀 Overview
This is a full-stack form validation project built with:

- Frontend: React + TypeScript  
- Backend: Express + TypeScript  
- Database: MongoDB  

Features include real-time validation, debounced API calls, and password strength checking.

---

## ✨ Features

### Frontend
- Controlled inputs
- Debounced validation (500ms)
- Email availability check
- Password strength meter (Weak / Medium / Strong)
- Touched-based validation UX
- Error & success handling

### Backend
- Express REST API
- MongoDB with Mongoose
- Duplicate email handling
- Error handling

---

## 🔌 API Endpoints

### POST /api/addUser
Add a new user

Request:
{
  "name": "John Doe",
  "email": "john@example.com"
}

Responses:
- 201: User added
- 409: Email exists
- 400: Validation error

---

### POST /api/lookUser
Check email availability

Request:
{
  "email": "john@example.com"
}

Responses:
- 200: Email available
- 401: Email exists

---

## 🧠 Validation Flow
1. User types input  
2. Debounce delays validation  
3. Validation runs  
4. If valid → API call  
5. UI updates accordingly  

---

## 🔐 Password Rules
- Minimum 8 characters  
- Uppercase, lowercase  
- Number  
- Special character  

Strength Levels:
- Weak
- Medium
- Strong

---

## 🛠 Installation

Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

---

## 🔑 Environment

Create .env in backend:
MONGO_URI=your_connection_string

---

## 👨‍💻 Author
Om Lachake
