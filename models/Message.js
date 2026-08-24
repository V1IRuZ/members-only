const pool = require("../db/pool");

class Message {
  static async insertMessage(userId, title, message) {
    await pool.query(
      "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
      [userId, title, message],
    );
  }
}

module.exports = Message;
