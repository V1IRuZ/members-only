const pool = require("../db/pool");

class User {
  static async insertUser(firstname, lastname, username, password) {
    await pool.query(
      "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
      [firstname, lastname, username, password],
    );
  }
}

module.exports = User;
