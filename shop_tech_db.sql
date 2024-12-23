-- shop-tech DDL for the entire database.

DROP DATABASE IF EXISTS shop_tech;
CREATE DATABASE IF NOT EXISTS shop_tech;

use shop_tech;

CREATE TABLE shops (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique identifier for each shop
    name VARCHAR(100) NOT NULL,          -- Shop's name
    location VARCHAR(255) NOT NULL,              -- Shop's physical location
    phone VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL        -- Country where the shop is located
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each administrator
    first_name VARCHAR(100) NOT NULL,           -- Administrator's first name
    last_name VARCHAR(100) NOT NULL,            -- Administrator's last name
    email VARCHAR(255) UNIQUE NOT NULL,         -- Administrator's email (must be unique)
    phone VARCHAR(20) NOT NULL,                 -- Administrator's phone number
    shop_id INT NOT NULL,                       -- Reference to the shop managed by the admin
    FOREIGN KEY (shop_id) REFERENCES shops(id)  -- Foreign key linking to the shops table
);

CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each agent
    admin_id INT NOT NULL,                      -- Reference to the admin managing the agent
    first_name VARCHAR(100) NOT NULL,           -- Agent's first name
    last_name VARCHAR(100) NOT NULL,            -- Agent's last name
    age INT CHECK (age >= 18),                  -- Agent's age (must be 18 or older)
    email VARCHAR(255) UNIQUE NOT NULL,         -- Agent's email (unique for each agent)
    phone VARCHAR(20) NOT NULL,                 -- Agent's phone number
    residence VARCHAR(255),                     -- Agent's residence (address or area)
    district VARCHAR(100),                      -- District of the agent
    country VARCHAR(100) NOT NULL,              -- Country of the agent
    FOREIGN KEY (admin_id) REFERENCES admins(id) -- Foreign key to an `admins` table
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique identifier for each category
    name VARCHAR(100) NOT NULL,          -- Name of the category
    description TEXT                     -- Optional description of the category
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Unique identifier for each product
    name VARCHAR(100) NOT NULL,                  -- Name of the product
    price DECIMAL(10, 2) NOT NULL,               -- Price of the product (e.g., 9999.99)
    description TEXT,                            -- Optional description of the product
    category_id INT NOT NULL,                    -- Reference to the category of the product
    available BOOLEAN DEFAULT TRUE,              -- Whether the product is available (TRUE/FALSE)
    stock_quantity INT DEFAULT 0,                -- Number of items in stock
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the product was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auto-update timestamp
    FOREIGN KEY (category_id) REFERENCES categories(id) -- Foreign key linking to the categories table
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Unique identifier for each image
    product_id INT NOT NULL,                -- Foreign key referencing the product
    image_url VARCHAR(255) NOT NULL,        -- URL of the image (stored on Google Drive)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of image upload
    FOREIGN KEY (product_id) REFERENCES products(id)  -- Foreign key linking to products table
);

CREATE TABLE products_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each record
    product_id INT NOT NULL,                 -- Reference to the product
    shop_id INT NOT NULL,                    -- Reference to the shop
    stock_quantity INT DEFAULT 0,            -- Number of items available in stock for the product at the shop
    FOREIGN KEY (product_id) REFERENCES products(id),  -- Foreign key referencing the products table
    FOREIGN KEY (shop_id) REFERENCES shops(id)         -- Foreign key referencing the shops table
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each order
    customer_name VARCHAR(100) NOT NULL,     -- Customer's name
    customer_phone VARCHAR(20) NOT NULL,     -- Customer's phone number
    product_id INT NOT NULL,                 -- Reference to the product being ordered
    quantity INT NOT NULL,                   -- Quantity of the product ordered
    agent_id INT NOT NULL,                   -- Reference to the agent who handled the order
    status VARCHAR(50) NOT NULL,             -- Status of the order (e.g., 'pending', 'completed', etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the order was created
    notes TEXT,                              -- Optional notes about the order (e.g., special instructions)
    FOREIGN KEY (product_id) REFERENCES products(id), -- Foreign key referencing the products table
    FOREIGN KEY (agent_id) REFERENCES agents(id)      -- Foreign key referencing the agents table
);

