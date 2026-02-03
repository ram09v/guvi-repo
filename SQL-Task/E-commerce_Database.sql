Part 1: Database & Table Creation

CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Table: customers
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255)
);

-- Table: products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT
);

-- Table: orders
-- NOTE: I have added a temporary 'product_id' column here so that 
-- Query #6 (Who ordered Product A) works before we normalize the database in Query #9.
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT, 
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


Part 2: Insert Sample Data

-- Insert data into customers
INSERT INTO customers (name, email, address) VALUES 
('John Doe', 'john@example.com', '123 Elm St, NY'),
('Jane Smith', 'jane@example.com', '456 Oak Ave, CA'),
('Alice Brown', 'alice@example.com', '789 Pine Ln, TX'),
('Bob White', 'bob@example.com', '321 Maple Dr, FL');

-- Insert data into products
INSERT INTO products (name, price, description) VALUES 
('Product A', 50.00, 'High quality gadget'),
('Product B', 30.00, 'Essential tool'),
('Product C', 40.00, 'Durable material'),
('Product D', 160.00, 'Premium item');

-- Insert data into orders (Dates set relative to allow testing Query #1)
INSERT INTO orders (customer_id, product_id, order_date, total_amount) VALUES 
(1, 1, CURDATE(), 50.00),                               -- John bought Product A today
(1, 3, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 40.00),     -- John bought Product C 5 days ago
(2, 1, DATE_SUB(CURDATE(), INTERVAL 10 DAY), 50.00),    -- Jane bought Product A 10 days ago
(3, 4, DATE_SUB(CURDATE(), INTERVAL 40 DAY), 160.00),   -- Alice bought Product D 40 days ago
(2, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 30.00);     -- Jane bought Product B 2 days ago


Part 3: The Queries

-- 1. Retrieve all customers who have placed an order in the last 30 days.

SELECT DISTINCT c.name, c.email 
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- 2. Get the total amount of all orders placed by each customer.

SELECT c.name, SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- 3. Update the price of Product C to 45.00.

UPDATE products 
SET price = 45.00 
WHERE name = 'Product C';

-- 4. Add a new column discount to the products table.

ALTER TABLE products 
ADD COLUMN discount DECIMAL(5, 2) DEFAULT 0.00;

-- 5. Retrieve the top 3 products with the highest price.

SELECT name, price 
FROM products 
ORDER BY price DESC 
LIMIT 3;

-- 6. Get the names of customers who have ordered Product A.

SELECT DISTINCT c.name 
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN products p ON o.product_id = p.id
WHERE p.name = 'Product A';

-- 7. Join the orders and customers tables to retrieve the customer's name and order date for each order.

SELECT c.name, o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;

-- 8. Retrieve the orders with a total amount greater than 150.00.

SELECT * FROM orders 
WHERE total_amount > 150.00;

-- 9. Normalize the database by creating a separate table for order items and updating the orders table. 

-- Step A: Create the new order_items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    price_at_purchase DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Step B: Migrate existing data
INSERT INTO order_items (order_id, product_id, price_at_purchase)
SELECT id, product_id, total_amount FROM orders;

-- Step C: Remove the product_id column from orders to complete normalization
ALTER TABLE orders 
DROP FOREIGN KEY orders_ibfk_2; -- Dropping the specific FK constraint (name may vary)

ALTER TABLE orders
DROP COLUMN product_id;

-- 10. Retrieve the average total of all orders.

SELECT AVG(total_amount) AS average_order_value 
FROM orders;