const pool = require("../db/pool");

class Message {
  static async insertMessage(userId, title, message) {
    await pool.query(
      "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
      [userId, title, message],
    );
  }

  static async getMessages(sort) {
    let query = `SELECT m.id, m.title, m.message, m.created_at, u.username, u.role 
        FROM messages m
        JOIN users u
        ON m.user_id = u.id 
      `;

    if (sort === "oldest") {
      query += "ORDER BY m.created_at ASC";
    } else {
      query += "ORDER BY m.created_at DESC";
    }

    const { rows } = await pool.query(query);

    return rows;
  }

  static async getMemberMessages(sort) {
    let query = `SELECT m.id, m.title, m.message, m.created_at, u.username, u.role 
        FROM messages m
        JOIN users u
        ON m.user_id = u.id
        WHERE u.role > 0
      `;

    if (sort === "oldest") {
      query += "ORDER BY m.created_at ASC";
    } else {
      query += "ORDER BY m.created_at DESC";
    }

    const { rows } = await pool.query(query);

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

  static async deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  }
}

module.exports = Message;
