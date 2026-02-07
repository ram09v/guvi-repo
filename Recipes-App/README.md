# Recipes API

A RESTful API built with Node.js, Express, and MongoDB for managing recipes.

## Features

- Create new recipes
- Read all recipes or a specific recipe by ID
- Update existing recipes
- Delete recipes

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file and add your `MONGO_URI`
4. Run `npm run server` or `node server.js`

## API Endpoints

- POST /api/recipes - Create a recipe
- GET /api/recipes - Get all recipes
- GET /api/recipes/:id - Get recipe by ID
- PUT /api/recipes/:id - Update recipe
- DELETE /api/recipes/:id - Delete recipe

## Postman Documentation Guide

- Open Postman and create a new collection named "Recipes API".
- Add the following requests to the collection:

    1.  Create Recipe
        - Method: `POST`
        - URL: `http://localhost:5000/api/recipes`
        - Body (raw JSON):
            ```json
            {
                "title": "Chicken Tikka Masala",
                "ingredients": ["Chicken Breast", "Yogurt", "Tomato Puree", "Cream", "Garam Masala", "Cumin", "Turmeric"],
                "instructions": "1. Marinate chicken in yogurt and spices for 30 mins.
                                2. Grill or sear chicken pieces.
                                3. Simmer tomato puree with cream and spices. 4. Add chicken to sauce and cook for 15 mins.",
                "cookingTime": 60,
                "difficulty": "Medium"
            }
            ```
        - Expected Response (201 Created): Returns the created object with an \_id.

    2.  Get All Recipes
        - Method: `GET`
        - URL: `http://localhost:5000/api/recipes`
        - Body: None
        - Expected Response (200 OK): An array of recipe objects.

    3.  Get Recipe By ID
        - Method: `GET`
        - URL: `http://localhost:5000/api/recipes/<COPY_ID_FROM_STEP_A>`
        - Body: None
        - Expected Response (200 OK): A single recipe object.

    4.  Update Recipe
        - Method: `PUT`
        - URL: `http://localhost:5000/api/recipes/<COPY_ID_FROM_STEP_A>`
        - Body (raw JSON):
            ```json
            {
            "cookingTime": 25,
            "difficulty": "Easy"
            }
            ```
        - Expected Response (200 OK): Returns the updated object (cooking time should be 25).

    5.  Delete Recipe
        - Method: `DELETE`
        - URL: `http://localhost:5000/api/recipes/<COPY_ID_FROM_STEP_A>`
        - Body: None
        - Expected Response (200 OK):
            ```json
            {
            "id": "64f...",
            "message": "Recipe deleted successfully"
            }
            ```