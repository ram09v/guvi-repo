# Auth API with Node.js, Express, and JWT

A production-ready Authentication module focusing on a secure "Forgot Password" flow. This project demonstrates how to implement password reset token generation, email delivery, token verification, and password updating using a modern tech stack.

## Tech Stack
   1. Frontend
      - React 18 (via Vite)
      - Tailwind CSS v4 (Utility-first CSS)
      - Axios (Centralized API client)
      - React Router v6 (Client-side routing)
      - React Toastify (Notifications)
      - Lucide React (Icons)

   2. Backend
      - Node.js & Express.js (REST API)
      - MongoDB & Mongoose (Database & ODM)
      - Nodemailer (Email delivery)
      - Crypto & Bcryptjs (Hashing & Security)

## Features
- User Registration (Password Hashing).
- Forgot Password (Generate Reset Token, Send Email).
- Verify Reset Token (Check Token Validity and Expiry).
- Reset Password (Update Password, Clear Reset Token).
- Error handling.

## Getting Started
   1. Backend Setup:
      - **Clone the repo**
      - **Navigate to backend**: `cd server`
      - **Install dependencies**: `npm install`
      - **Configure Environment**: Create a `.env` file and add DB and Email configuration details.
      - **Run Server**: `npm run dev` (if using nodemon) or `node server.js`.

   2. Frontend Setup:
      - **Navigate to frontend**: `cd client`
      - **Install dependencies**: `npm install`
      - **Run Frontend**: `npm run dev` (if using Vite) or `npm start` (if using Create React App).

# Accessing the Application
  - Once both servers are running, you can access the frontend at `http://localhost:5173` and the backend API at `http://localhost:5000/api/auth`.

# Testing the Flow
  - Use postman to resgister a user, details are in the Postman Documentation Guide below. 
  - Open the app (http://localhost:5173).
  - Enter an email address (must exist in DB).
  - Check Mail for the link.
  - Click the link -> React validates the token.
  - Enter new password -> Success message appears.

## Postman Documentation Guide

- Open Postman and create a new collection named "Auth API".
- Add the following requests to the collection:

    1.  User Registration
        - Method: `POST`
        - URL: `http://localhost:5000/api/auth/register`
        - Body (raw JSON):
            ```json
            {
                "username": "johndoe",
                "email": "johndoe@example.com",
                "password": "password123"
            }
            ```
        - Expected Response (201 Created): Returns the created user object (excluding password).

    2.  Forgot Password
        - Method: `POST`
        - URL: `http://localhost:5000/api/auth/forgotpassword`
        - Body (raw JSON):
            ```json
            {
                "email": "johndoe@example.com"
            }
            ```
        - Expected Response (200 OK): Returns a message indicating that the reset email has been sent.
    
    3.  Verify Reset Token
        - Method: `GET`
        - URL: `http://localhost:5000/api/auth/resetpassword/:resettoken`
        - Expected Response (200 OK): Returns a success message if the token is valid and not expired.

    4.  Reset Password
        - Method: `PUT`
        - URL: `http://localhost:5000/api/auth/resetpassword/:resettoken`
        - Body (raw JSON):
            ```json
            {
                "password": "newpassword123"
            }
            ```
        - Expected Response (200 OK): Returns a success message indicating that the password has been reset.