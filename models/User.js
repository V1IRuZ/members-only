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
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    return rows[0];
  }

  static async updateUserMembership(id) {
    await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1", [id]);
  }

  static async updateUserPassword(id, password) {
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      password,
      id,
    ]);
  }
}

module.exports = User;
