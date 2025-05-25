import db from "../../infrastructure/db/mysql.connection.js";

export class EmployeeRepository {
  async create(employee) {
    const [result] = await db.execute(
      `INSERT INTO employees (document, full_name, position_id, department_id, hire_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        employee.document,
        employee.full_name,
        employee.position_id,
        employee.department_id,
        employee.hire_date,
        employee.status,
      ]
    );
    return result.insertId;
  }

  async list() {
    const [rows] = await db.execute(`SELECT * FROM employees`);
    return rows;
  }
}
