const bcrypt = require("bcryptjs");
const { Client } = require("pg");

const tables = `
DROP TABLE IF EXISTS messages, users CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR (100) NOT NULL,
  lastname VARCHAR (100) NOT NULL,
  username VARCHAR (100) NOT NULL,
  password VARCHAR (255) NOT NULL,
  role INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX username_unique
  ON users (LOWER(username));

CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  title VARCHAR (255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);  
`;

const insertUsers = `
INSERT INTO users
  (firstname, lastname, username, password, role) VALUES  
    ('John', 'Doe', 'john', '$1', 1),
    ('Jane', 'Doe', 'jane', '$1', 0),
    ('Admin', 'User', 'admin', '$1', 2) 
`;

const messages = `
INSERT INTO messages
  (user_id, title, message) VALLUES
  (1, 'Hello', 'Hello World!'),
  (3, 'Welcome', 'Hello everyone!'),
  (2, 'Yo', '=)')
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const password = await bcrypt.hash(process.env.USER_PASSWORD, 10);

  await client.connect();
  await client.query(tables);
  await client.query(insertUsers, [password]);
  await client.query(messages);
  await client.end();
  console.log("done");
}

main();
