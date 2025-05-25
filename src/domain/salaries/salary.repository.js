import db from "../../infrastructure/db/mysql.connection.js";

export class SalaryRepository {
  async create(employee_id, salary) {
    const [existing] = await db.execute(
      `SELECT id FROM salaries WHERE employee_id = ? AND year = ?`,
      [employee_id, salary.year]
    );
    if (existing.length > 0)
      throw new Error("Salary already registered for this year");

    const [result] = await db.execute(
      `INSERT INTO salaries (employee_id, year, base_salary, transport_aid)
       VALUES (?, ?, ?, ?)`,
      [employee_id, salary.year, salary.base_salary, salary.transport_aid]
    );
    return result.insertId;
  }

  async listByEmployee(employee_id) {
    const [rows] = await db.execute(
      `SELECT year, base_salary, transport_aid FROM salaries WHERE employee_id = ? ORDER BY year`,
      [employee_id]
    );
    return rows;
  }
}
