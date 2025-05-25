import db from "../../infrastructure/db/mysql.connection.js";

export class LegalBonusRepository {
  async exists(employee_id, year, period) {
    const [rows] = await db.execute(
      `SELECT id FROM legal_bonuses WHERE employee_id = ? AND year = ? AND period = ?`,
      [employee_id, year, period]
    );
    return rows.length > 0;
  }

  async getTotalEarnedInSemester(employee_id, year, period) {
    const months =
      period === "JUNE" ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];
    const [rows] = await db.execute(
      `SELECT SUM(total_earned) AS total FROM payroll
       WHERE employee_id = ? AND year = ? AND month IN (${months.join(",")})`,
      [employee_id, year]
    );
    return rows[0]?.total || 0;
  }

  async insert(employee_id, year, period, amount) {
    const [res] = await db.execute(
      `INSERT INTO legal_bonuses (employee_id, year, period, amount)
       VALUES (?, ?, ?, ?)`,
      [employee_id, year, period, amount]
    );
    return res.insertId;
  }

  async findByYear(year) {
    const [rows] = await db.execute(
      `SELECT lb.id, lb.employee_id, e.full_name, lb.year, lb.period, lb.amount
       FROM legal_bonuses lb
       JOIN employees e ON lb.employee_id = e.id
       WHERE lb.year = ?
       ORDER BY lb.period`,
      [year]
    );
    return rows;
  }

  async findByEmployee(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT year, period, amount FROM legal_bonuses
       WHERE employee_id = ? AND year = ?`,
      [employee_id, year]
    );
    return rows;
  }
}
