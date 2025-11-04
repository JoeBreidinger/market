// Same as with users, import the necessary libraries
import db from "#db/client";

// How do we need to interact with the db concerning orders?
// We need to be able to add new orders and find orders through different keys
// createOrder, getOrdersByUserId, getOrderById, getOrderByUserIdAndProductId

export async function createOrder(userId, date, note) {
  const SQL = `
    INSERT INTO orders
        (user_id, date, note)
    VALUES
        ($1, $2, $3)
    `;
  // First part of the function is always the SQL query in template literal format
  // Second part is then creating the object (in this case the order) so we can act upon it in regard to the database
  // (in this case we're INSERTING a new [order] INTO the orders table)
  const {
    rows: [order],
  } = await db.query(SQL, [userId, date, note]);
  return order;
}

export async function getOrderById(id) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE id = $1
    `;
  const {
    rows: [order],
  } = await db.query(SQL, [id]);
  return order;
}

export async function getOrdersByUserId(userId) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    `;
  const { rows: orders } = await db.query(SQL, [userId]);
  return orders;
}

export async function getOrderByUserIdAndProductId(userId, productId) {
  const SQL = `
    SELECT
        orders.*
    FROM
        orders
        JOIN orders_products ON orders.id = orders_products.order_id
    WHERE
        orders.user_id = $1
        AND orders_products.product_id = $2 
    `;
  const { rows: orders } = await db.query(SQL, [userId, productId]);
  return orders;
}

// This last queries relies on a junction table
// Orders and Products have a many to many relationship
// An order can have many products and one many products can be in many different orders
// By JOINING the junction table, we can select an order based on it's relationship to the user table and product table

// Next, we'll need to make the products queries so we can set up the junction table after that
