// This junction table is how the db keeps track og which items are on what order
// (and what order belongs to which user)

import db from "#db/client";

export async function createOrderProduct(orderId, productId, quantity) {
  const SQL = `
    INSERT INTO orders_products
        (order_id, product_id, quantity)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [orderProduct],
  } = await db.query(SQL, [orderId, productId, quantity]);
  return orderProduct;
}
