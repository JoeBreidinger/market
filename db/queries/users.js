// Here we have the queries pertaining to the apps users
// First, you have to import pg Client (as db) from the db/client file
// Second, import bcrypt to encrypt users' login information within the server requests
import db from "#db/client";
import bcrypt from "bcrypt";

// Now from here, you have to specify how to interact with the db through the query functions
// How do we need to interact with the db concerning users?
// We'll need to be able to create new users and find users in the db
// (and probably modify/delete users info too but that's not included in this workshop)
// Create user = INSERT INTO in SQL
// getUserById and getUserByUsernameAndPassword = SELECT in SQL
export async function createUser(username, password) {
  const SQL = `
    INSERT INTO users
        (username, password)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(SQL, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const SQL = `
    SELECT *
    FROM users
    WHERE username = $1
    `;
  const {
    rows: [user],
  } = await db.query(SQL, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  const SQL = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
  const {
    rows: [user],
  } = await db.query(SQL, [id]);
  return user;
}

// Each user can have many orders so the next set of queries to work on would be the orders queries
// Users and Orders have a one to many relationship
