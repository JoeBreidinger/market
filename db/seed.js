import db from "#db/client";
// Now that the query functions are finished, we can import and use them in our seed function
import { createOrder } from "#db/queries/orders";
import { createProduct } from "#db/queries/products";
import { createUser } from "#db/queries/users";
import { createOrderProduct } from "#db/queries/ordersProducts";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

// async function seed() {
//   // To create one user, we do not need any loop logic
//   const user = await createUser("RobertPlant", "Kashm1r");

//   // To create 10 products we need a for loop
//   for (let i = 1; i < 10; i++) {
//     await createProduct(
//       "Product " + i,
//       "Lorem Ipsum description" + i,
//       Math.random() * 100
//     ); // creates a series of Product i, Lorem Ipsum description, with a random price between 0.00 and 99.99
//   }

//   // To make new orders we also need to use a loop
//   const order = await createOrder(user.id, "2025-08-25");
//   for (let i = 1; i <= 5; i++) {
//     await createOrderProduct(order.id, i, i);
//   }
// }

async function seed() {
  // Create 1 user
  const user = await createUser("superstar", "loves2shop");

  // Create 10 products
  for (let i = 1; i <= 10; i++) {
    await createProduct(
      "Product " + i,
      "Description " + i,
      Math.random() * 100
    );
  }

  // User makes an order of 5 products
  const order = await createOrder(user.id, "7777-07-07");
  for (let i = 1; i <= 5; i++) {
    await createOrderProduct(order.id, i, i);
  }
}

// Now that the db is seeded, we can set up the routing logic in our api folder
// This will allow this express app to listen for and handle requests from the client
// then also being able to send the response from the server back to the client
