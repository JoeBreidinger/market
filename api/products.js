// The web store needs products to browse and buy
// We'll need to requests to the db to render those products

import express from "express";
const router = express.Router();
export default router;

import { getProductById, getProducts } from "#db/queries/products";
import { getOrderByUserIdAndProductId } from "#db/queries/orders";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.param("id", async (req, res, next, id) => {
  const product = await getProductById(id);
  if (!product) return res.status(404).send("Product not found");
  req.product = product;
  next();
});

router.get("/id", (req, res) => {
  res.send(req.product);
});

router.get("/:id/orders", requireUser, async (req, res) => {
  const orders = await getOrderByUserIdAndProductId(
    req.user.id,
    req.product.id
  );
  res.send(orders);
});
