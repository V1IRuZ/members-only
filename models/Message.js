const pool = require("../db/pool");

class Message {
  static async insertMessage(userId, title, message) {
    await pool.query(
      "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
      [userId, title, message],
    );
  }

  static async getMessages() {
    const { rows } = await pool.query(
      `SELECT m.id, m.title, m.message, m.created_at, u.username 
        FROM messages m
        JOIN users u
        ON m.user_id = u.id
        ORDER BY m.created_at DESC
      `,
    );

    return rows;
  }
}

module.exports = Message;
