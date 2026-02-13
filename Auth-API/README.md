# Auth API with Node.js, Express, and JWT

This is a RESTful API for User Authentication and Authorization using the MVC pattern.

## Tech Stack
- **Node.js & Express.js**: Backend framework.
- **Mongoose**: MongoDB object modeling.
- **JWT (JSON Web Tokens)**: Secure user authentication.
- **Bcryptjs**: Password hashing.

## Features
- User Registration (Password Hashing).
- User Login (JWT generation).
- Protected Routes (Middleware to verify Bearer Token).
- Error handling.

## Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Configure Environment**: Create a `.env` file and add `MONGO_URI` and `JWT_SECRET`.
4. **Run Server**: `npm run dev` (if using nodemon) or `node server.js`.

## Postman Documentation Guide

- Open Postman and create a new collection named "Auth API".
- Add the following requests to the collection:

    1.  User Registration
        - Method: `POST`
        - URL: `http://localhost:6000/api/auth/register`
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
        - URL: `http://localhost:6000/api/auth/login`
        - Body (raw JSON):
            ```json
            {
                "email": "johndoe@example.com",
                "password": "password123"
            }
            ```
        - Expected Response (200 OK): Returns a JWT token and user information (excluding password).

    3.  Access Protected Route
        - Method: `GET`
        - URL: `http://localhost:6000/api/auth/me`
        - Headers:
            - `Authorization`: `Bearer <your-jwt-token>`
        - or use Postman's Authorization tab to set Bearer Token.
        - Expected Response (200 OK): Returns the authenticated user's profile information.