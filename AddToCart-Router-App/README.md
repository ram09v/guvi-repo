# React E-Commerce Cart with Routing

A ReactJS application using React Router to manage a product listing and a dedicated shopping cart page.

## Features

- **Multi-Page Layout**:
  - **Home (Product Page)**: Displays products fetched from FakeStore API.
  - **Cart Page**: Dedicated route `/cart` to manage items.
- **Smart Cart Actions**:
  - "Add to Cart" changes to "Remove from Cart" on the home page if the item is added.
- **Cart Management**:
  - Increase/Decrease quantity per item.
  - Remove items dynamically.
- **Pricing Logic**:
  - Dynamic Subtotal calculation.
  - **10% Discount** applied to the final total.
  - Currency localized to INR (₹).

## Tech Stack

- React JS
- React Router DOM
- Tailwind CSS V4
- Fake Store API

## Setup

1. Install dependencies:
   ```bash
   npm install react-router-dom
   ```