# Income Expense Calculator

A simple and responsive web application built with HTML, CSS (Tailwind), and JavaScript to help you manage your income and expenses.

## Description

Track your finances effortlessly with this Income Expense Calculator. Add income and expense entries, view your net balance, and filter transactions by type. All data is stored locally in your browser.

## Features

- **Add Transactions**: Record income and expense entries with descriptions and amounts
- **Edit Transactions**: Click the edit icon to modify existing entries
- **Delete Transactions**: Remove transactions with the delete button
- **Real-time Balance**: See your net balance, total income, and total expenses updated instantly
- **Filter Transactions**: View all, income-only, or expense-only transactions
- **Persistent Storage**: Data is saved in localStorage and persists between sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Currency Formatting**: Amounts are formatted in Indian Rupees (₹) with proper decimal places

## Technologies Used

- **HTML5**: Structure and semantic markup.
- **Tailwind CSS**: Used for styling and responsive layout.
- **Vanilla JavaScript**: DOM manipulation, state management, and localStorage
- **LocalStorage API**: Client-side data persistence

## How to Use

1. **Add a Transaction**:

   - Enter a description (e.g., "Salary", "Rent")
   - Input the amount in rupees
   - Select the type (Income or Expense)
   - Click "Add Entry"

2. **Edit a Transaction**:

   - Click the edit icon (pencil) next to any transaction
   - Modify the details in the form
   - Click "Update Entry"

3. **Delete a Transaction**:

   - Click the delete icon (trash) next to any transaction

4. **Filter Transactions**:

   - Use the radio buttons to filter by All, Income, or Expense

5. **Reset Form**:
   - Click "Reset" to clear the form fields

## Installation & Setup

1. Clone or download the project files
2. Open `index.html` in your web browser
3. No server or build process required!

## Data Persistence

- All transactions are automatically saved to your browser's localStorage
- Data persists between browser sessions
- Clearing browser data will remove all stored transactions
