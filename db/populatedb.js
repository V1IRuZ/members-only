const { Client } = require("pg");

const SQL = `
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

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
