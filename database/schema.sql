--Admin users can upload tarts and set their price
CREATE TABLE IF NOT EXISTS Users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    hashed_password VARCHAR(100),
    user_role VARCHAR(90)
);
-- tart table
CREATE TABLE IF NOT EXISTS Tart(
    tart_id SERIAL PRIMARY KEY,
    price DECIMAL(10,2) NOT NULL,
    tart_type VARCHAR(200),
    tart_name VARCHAR(200),
    image_url TEXT,
    tart_description TEXT

);
-- table for customer orders 
CREATE TABLE IF NOT EXISTS CustomerOrder(
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tart_id INT NOT NULL,
    order_status VARCHAR(90),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (tart_id) REFERENCES Tart(tart_id)

);
-- table storing tarts contained in a customer order
CREATE TABLE IF NOT EXISTS OrderItems(
    order_id INT NOT NULL,
    tart_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (order_id, tart_id),
    FOREIGN KEY (order_id) REFERENCES CustomerOrder(order_id),
    FOREIGN KEY (tart_id) REFERENCES Tart(tart_id)
);
-- Review table containing customer reviews for tarts
CREATE TABLE IF NOT EXISTS Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tart_id INT NOT NULL,
    star_rating INT CHECK (star_rating BETWEEN 1 AND 5),
    written_review TEXT,
    -- picture review contains filepath for uploaded image of tart
    picture_review VARCHAR(300), 
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (tart_id) REFERENCES Tart(tart_id)
);
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE cart_items(
    id SERIAL PRIMARY KEY,
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    tart_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT now()
    FOREIGN KEY (tart_id) REFERENCES Tart(tart_id)
);

