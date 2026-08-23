const pool = require("../db/pool");

class User {
  static async insertUser(firstname, lastname, username, password) {
    await pool.query(
      "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
      [firstname, lastname, username, password],
    );
  }

  static async findUsername(username) {
    const { rows } = await pool.query(
      "SELECT username FROM users WHERE LOWER(username) = LOWER($1)",
      [username],
    );

    return rows[0];
  }

  static async getUserByUsername(username) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    return rows[0];
  }

  static async getUserById(id) {
    const { rows } = await pool.query(
      "SELECT id, firstname, lastname, username, is_member FROM users WHERE id = $1",
      [id],
    );

    return rows[0];
  }
}

module.exports = User;
