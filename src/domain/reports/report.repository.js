import db from "../../infrastructure/db/mysql.connection.js";

export class ReportRepository {
  async getMonthlyGlobal(year, month) {
    const [rows] = await db.execute(
      `SELECT
         COUNT(*) AS total_employees,
         SUM(total_earned) AS total_earned,
         SUM(total_deductions) AS total_deductions,
         SUM(net_salary) AS total_net
       FROM payroll
       WHERE year = ? AND month = ?`,
      [year, month]
    );
    return { year, month, ...rows[0] };
  }

  async getEmployeeHistory(employee_id) {
    const [rows] = await db.execute(
      `SELECT year, month, total_earned, total_deductions, net_salary
       FROM payroll
       WHERE employee_id = ?
       ORDER BY year, month`,
      [employee_id]
    );
    return rows;
  }

  async getEmployeeAnnualSummary(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT
         SUM(total_earned) AS total_earned,
         SUM(total_deductions) AS total_deductions,
         SUM(net_salary) AS total_net
       FROM payroll
       WHERE employee_id = ? AND year = ?`,
      [employee_id, year]
    );
    return { employee_id, year, ...rows[0] };
  }
}
