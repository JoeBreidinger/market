-- Delete existing tables upon set up
DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


-- Create each table according to DMBL
CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE orders (
    id serial PRIMARY KEY,
    date date NOT NULL,
    note text,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    price numeric(2) NOT NULL
);


-- Note Primary Key
CREATE TABLE orders_products(
    order_id int NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id int NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity int NOT NULL,
        PRIMARY KEY (order_id, product_id)
);

-- Once SQL is written, create the db. Then you can run npm db:schema to set up tables within that db
-- After tables are created, we need to seed them to test routes
-- To seed the table we need to start with query functions in to communicate with the db