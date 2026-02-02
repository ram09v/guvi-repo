# React Movie Search App

A full-featured movie search application built with React, Tailwind CSS, and the OMDB API.

## Features

- **Search:** Find movies, series, and episodes by keyword.
- **Filtering:** Filter results by type (Movie, Series, Episode) using API parameters.
- **Pagination:** Navigate through large sets of search results.
- **Details View:** View in-depth information including larger poster, title, release year, genre, plot, cast, and ratings.
- **Responsive Design:** Grid layout optimized for desktop and mobile.

## Tech Stack

- **React JS**: Component-based UI.
- **React Router**: Client-side navigation.
- **Tailwind CSS (v4)**: Utility-first styling.
- **OMDB API**: Data source for movie information.

## Setup Instructions

1.  Clone the repository.
2.  Run `npm install` to install dependencies.
3.  Open `src/services/api.js` and replace `'YOUR_OMDB_API_KEY'` with your valid key from [omdbapi.com](http://www.omdbapi.com/).
4.  Run `npm run dev` to start the application.

## Requirement Highlights

- **API Filtering**: The app uses the `&type=` URL parameter for filtering (not `array.filter`).
- **Pagination**: Implemented using API `&page=` parameter.
- **Routing**: Clean navigation between Search and Detail views.