import db from "#db/client";

export async function createProduct(title, description, price) {
  const SQL = `
    INSERT INTO products
        (title, description, price)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [products],
  } = await db.query(SQL, [title, description, price]);
  return products;
}

export async function getProducts() {
  const SQL = `
    SELECT *
    FROM products
    `;
  const { rows: products } = await db.query(SQL);
  return products;
}

export async function getProductById(id) {
  const SQL = `
    SELECT *
    FROM products
    WHERE id = $1`;
  const {
    rows: [product],
  } = await db.query(SQL, [id]);
  return product;
}

export async function getProductsByOrderId(orderId) {
  const SQL = `
    SELECT
        products.*
    FROM
        products
        JOIN orders_products ON products.id = orders_products.product_id
    WHERE
        orders_products.order_id = $1`;
  const { rows: products } = await db.query(SQL, [orderId]);
  return products;
}
