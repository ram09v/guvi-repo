# Auth API with Node.js, Express, and JWT

A production-ready Authentication module focusing on a secure "Forgot Password" flow. This project demonstrates how to implement password reset token generation, email delivery, token verification, and password updating using a modern tech stack.

## Tech Stack
   1. Frontend
      - React 18 (via Vite)
      - Tailwind CSS v4 (Utility-first CSS)
      - Axios (Centralized API client)
      - React Hook Form (Form handling & validation)
      - React Router v6 (Client-side routing)
      - React Toastify (Notifications)
      - Lucide React (Icons)
      

   2. Backend
      - Node.js & Express.js (REST API)
      - MongoDB & Mongoose (Database & ODM)
      - Brevo (Sendinblue) V3 API (Email delivery)
      - Crypto & Bcryptjs (Hashing & Security)
      - JSON Web Tokens (Authentication)
      - Express Rate Limit (Brute-force protection) 

## Features
- User Registration (Password Hashing).
- User Login (Token Generation).
- Forgot Password (Generate Reset Token, Send Email).
- Verify Reset Token (Check Token Validity and Expiry).
- Reset Password (Update Password, Clear Reset Token).
- Rate Limiting (Prevent Brute-force Attacks).
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
      - **Configure Environment**: Create a `.env` file and add the backend API URL (e.g., `VITE_API_URL=http://localhost:5000/api/auth`).
      - **Run Frontend**: `npm run dev` (if using Vite) or `npm start` (if using Create React App).

# Accessing the Application
  - Once both servers are running, you can access the frontend at `http://localhost:5173` and the backend API at `http://localhost:5000/api/auth`.

# Testing the Flow
  - Register a new user via the registration form.
  - Use the "Forgot Password" feature to request a password reset.
  - Check your email for the reset link and follow the instructions to set a new password.
  - Login with the new password to confirm it works.
 
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

    2.  User Login
        - Method: `POST`
        - URL: `http://localhost:5000/api/auth/login`
        - Body (raw JSON):
            ```json
            {
                "email": "johndoe@example.com",
                "password": "password123"
            }
            ```
        - Expected Response (200 OK): Returns a JWT token and user details (excluding password).

    3.  Forgot Password
        - Method: `POST`
        - URL: `http://localhost:5000/api/auth/forgotpassword`
        - Body (raw JSON):
            ```json
            {
                "email": "johndoe@example.com"
            }
            ```
        - Expected Response (200 OK): Returns a message indicating that the reset email has been sent.
    
    4.  Verify Reset Token
        - Method: `GET`
        - URL: `http://localhost:5000/api/auth/resetpassword/:resettoken`
        - Expected Response (200 OK): Returns a success message if the token is valid and not expired.

    5.  Reset Password
        - Method: `PUT`
        - URL: `http://localhost:5000/api/auth/resetpassword/:resettoken`
        - Body (raw JSON):
            ```json
            {
                "password": "newpassword123"
            }
            ```
        - Expected Response (200 OK): Returns a success message indicating that the password has been reset.

## Conclusion
This project provides a comprehensive example of how to implement a secure password reset flow in a Node.js and React application. It covers all essential aspects, including token generation, email delivery, token verification, and password updating, while also incorporating security best practices like rate limiting to protect against brute-force attacks.