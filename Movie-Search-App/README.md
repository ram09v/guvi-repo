# React Movie Search App

A full-featured movie search application built with React, Tailwind CSS, and the OMDB API.

## Features

- **Search:** Find movies and series by keyword.
  - **Smart Search:** Automatically trims leading/trailing whitespace from queries to prevent zero-result errors (e.g., `"Matrix "` becomes `"Matrix"`).
- **Filtering:** Filter results by type (Movie, Series) using API parameters.
- **Pagination:** Navigate through large sets of search results.
  - **Conditional Pagination:** Pagination controls are automatically hidden if the total search results fit on a single page (≤ 10 items).
- **Details View:** View in-depth information including larger poster, title, release year, genre, plot, cast, and ratings.
  - **Smart Fallbacks:**
    - **Images:** Automatic placeholder images for missing posters ("N/A") or broken URLs (404s).
    - **Ratings:** Graceful "No Ratings Available" messaging for obscure titles.
- **Responsive Design:** Grid layout optimized for desktop and mobile.
  - **Mobile:** 1 card
  - **Tablet:** 2 cards
  - **Laptop:** 3-4 cards
  - **Large Screens:** 5 cards per row (maximized for large displays).

## Tech Stack

- **Frontend:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS V4
- **Data:** OMDB API (Open Movie Database)
- **Icons:** Heroicons (SVG)

## Setup Instructions

1.  Clone the repository.
2.  Run `npm install` to install dependencies.
3.  Open `src/services/api.js` and replace `'VITE_OMDB_API_KEY'` with your valid key from [omdbapi.com](http://www.omdbapi.com/).
4.  Run `npm run dev` to start the application.

## Requirement Highlights

- **API Filtering**: The app uses the `&type=` URL parameter for filtering (not `array.filter`).
- **Pagination**: Implemented using API `&page=` parameter.
- **Routing**: Clean navigation between Search and Detail views.
- **View Modes**: Toggle between a **Grid View** (visual-heavy) and a **List View** (information-dense) with a single click.
- **Error Handling**: If an image URL returns a 404 (broken link) or the API returns "N/A", the app instantly swaps it for a styled placeholder to maintain visual consistency.
