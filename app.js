import express from "express";
const app = express();
export default app;

// Finally, we need to set up our express app by "laying the wires" or setting up the route connections
// Import each of the api files

import ordersRouter from "#api/orders";
import productsRouter from "#api/products";
import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";

// express.use(express.json()) to send and receive in json format
app.use(express.json());

// Authentication token
app.use(getUserFromToken);

// The "wires in ports"
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Error handling
app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong...");
});
