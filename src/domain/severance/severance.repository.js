import db from "../../infrastructure/db/mysql.connection.js";

export class SeveranceRepository {
  async alreadyExists(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT id FROM severance WHERE employee_id = ? AND year = ?`,
      [employee_id, year]
    );
    return rows.length > 0;
  }

  async getEmployeeInfo(employee_id) {
    const [rows] = await db.execute(
      `SELECT hire_date FROM employees WHERE id = ?`,
      [employee_id]
    );
    return rows[0];
  }

  async getAnnualSalaryData(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT base_salary, transport_aid
       FROM salaries
       WHERE employee_id = ? AND year = ?
       LIMIT 1`,
      [employee_id, year]
    );
    return rows[0];
  }

  async insert(employee_id, year, severance_amount, interest_amount) {
    const [res] = await db.execute(
      `INSERT INTO severance (employee_id, year, severance_amount, interest_amount)
       VALUES (?, ?, ?, ?)`,
      [employee_id, year, severance_amount, interest_amount]
    );
    return res.insertId;
  }

  async getAllByYear(year) {
    const [rows] = await db.execute(
      `SELECT s.id, s.employee_id, e.full_name, s.year, s.severance_amount, s.interest_amount
       FROM severance s
       JOIN employees e ON s.employee_id = e.id
       WHERE s.year = ?`,
      [year]
    );
    return rows;
  }

  async getByEmployee(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT year, severance_amount, interest_amount
       FROM severance
       WHERE employee_id = ? AND year = ?`,
      [employee_id, year]
    );
    return rows;
  }
}
