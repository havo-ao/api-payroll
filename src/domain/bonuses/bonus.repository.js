import db from "../../infrastructure/db/mysql.connection.js";

export class BonusRepository {
  async insert(bonus) {
    const [res] = await db.execute(
      `INSERT INTO bonuses (employee_id, year, amount, reason)
       VALUES (?, ?, ?, ?)`,
      [bonus.employee_id, bonus.year, bonus.amount, bonus.reason]
    );
    return res.insertId;
  }

  async findByYear(year) {
    const [rows] = await db.execute(
      `SELECT b.id, b.employee_id, e.full_name, b.year, b.amount, b.reason
       FROM bonuses b
       JOIN employees e ON b.employee_id = e.id
       WHERE b.year = ?
       ORDER BY b.amount DESC`,
      [year]
    );
    return rows;
  }

  async findByEmployee(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT year, amount, reason
       FROM bonuses
       WHERE employee_id = ? AND year = ?`,
      [employee_id, year]
    );
    return rows;
  }
}
