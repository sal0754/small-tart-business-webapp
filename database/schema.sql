CREATE TABLE User(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    hashed_password VARCHAR(100),
    user_role VARCHAR(90)
);

CREATE TABLE Tart(
    tart_id SERIAL PRIMARY KEY,
    price FLOAT NOT NULL,
    tart_type VARCHAR(200)

);

CREATE TABLE CustomerOrder(
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (tart_id) REFERENCES Tart(tart_id)

);

CREATE TABLE OrderItems(
    order_id INT NOT NULL,
    tart_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (order_id, tart_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (tart_id) REFERENCES Tarts(tart_id)
);

CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tart_id INT NOT NULL,
    star_rating INT CHECK (star_rating BETWEEN 1 AND 5),
    written_review TEXT,
    -- picture review contains filepath for uploaded image of tart
    picture_review VARCHAR(300), 
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (tart_id) REFERENCES Tart(tart_id)
);