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
      `SELECT m.id, m.title, m.message, m.created_at, u.username, u.is_member 
        FROM messages m
        JOIN users u
        ON m.user_id = u.id
        ORDER BY m.created_at DESC
      `,
    );

    return rows;
  }

  static async getMemberMessages() {
    const { rows } = await pool.query(
      `SELECT m.id, m.title, m.message, m.created_at, u.username, u.is_member 
        FROM messages m
        JOIN users u
        ON m.user_id = u.id
        WHERE u.is_member = TRUE
        ORDER BY m.created_at DESC
      `,
    );

    return rows;
  }

  static async getUserNumOfMessages(id) {
    const { rows } = await pool.query(
      ` SELECT COUNT(m.user_id) 
        FROM users u 
        JOIN messages m 
        ON u.id = m.user_id 
        WHERE m.user_id = $1
      `,
      [id],
    );

    return rows[0];
  }
}

module.exports = Message;
