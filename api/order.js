// Here's where it gets fun
// Import express as and other functions as usual
import express from "express";
const router = express.Router();
export default router;

import {
  createOrder,
  getOrderById,
  getOrderByUserId,
  getOrdersByUserId,
} from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/ordersProducts";
import { getProductsByOrderId } from "#db/queries/products";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

// All of these routes require an account
router.use(requireUser);

router.post("/", requireBody(["date"]), async (req, res) => {
  const { date, note } = req.body;
  const order = await createOrder(req.user.id, date, note);
  res.status(201).send(order);
});

router.get("/", async (req, res) => {
  const orders = await getOrdersByUserId(req.user.id);
  res.send(orders);
});

router.param("id", async (req, res) => {
  const order = await getOrderById(id);
  if (!order) return res.status(404).send("Order not found");

  if (order.user_id !== req.user.id)
    return res.status(403).send("This is not your order");

  req.order = order;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.order);
});

router.post(
  ":id/products",
  requireBody(["productId", "quantity"]),
  async (req, res) => {
    const { productId, quantity } = req.body;
    const orderProduct = await createOrderProduct(
      req.order.id,
      productId,
      quantity
    );
    res.status(201).send(orderProduct);
  }
);

router.get("/:id/products", async (req, res) => {
  const products = await getProductsByOrderId(req.order.id);
  res.send(products);
});
