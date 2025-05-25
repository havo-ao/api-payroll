import db from "../../infrastructure/db/mysql.connection.js";

export class PayrollRepository {
  async getPayroll(employee_id, year, month) {
    const [rows] = await db.execute(
      `SELECT id, employee_id, year, month, total_earned, total_deductions, net_salary, generated_at
       FROM payroll
       WHERE employee_id = ? AND year = ? AND month = ?`,
      [employee_id, year, month]
    );
    return rows[0] || null;
  }

  async checkExists(employee_id, year, month) {
    const [rows] = await db.execute(
      `SELECT id FROM payroll WHERE employee_id = ? AND year = ? AND month = ?`,
      [employee_id, year, month]
    );
    return rows.length > 0;
  }

  async getPayrollData(employee_id, year) {
    const [rows] = await db.execute(
      `SELECT
         s.base_salary,
         s.transport_aid,
         s.base_salary + s.transport_aid AS total_earned,
         (s.base_salary * 0.04 + s.base_salary * 0.04 + s.base_salary * ss.arl_percent / 100) AS total_deductions,
         (s.base_salary + s.transport_aid) -
           (s.base_salary * 0.04 + s.base_salary * 0.04 + s.base_salary * ss.arl_percent / 100) AS net_salary,
         ss.arl_percent
       FROM salaries s
       CROSS JOIN social_security ss
       WHERE s.employee_id = ? AND s.year = ?
       LIMIT 1`,
      [employee_id, year]
    );
    return rows[0];
  }

  async insertPayroll(p) {
    const [res] = await db.execute(
      `INSERT INTO payroll (employee_id, year, month, total_earned, total_deductions, net_salary)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        p.employee_id,
        p.year,
        p.month,
        p.total_earned,
        p.total_deductions,
        p.net_salary,
      ]
    );
    return res.insertId;
  }

  async insertDetails(payroll_id, base, aid, arl_percent) {
    const details = [
      { concept: "Salario base", amount: base, type: "EARNING" },
      { concept: "Auxilio de transporte", amount: aid, type: "EARNING" },
      {
        concept: "Descuento Salud (4%)",
        amount: base * 0.04,
        type: "DEDUCTION",
      },
      {
        concept: "Descuento Pensión (4%)",
        amount: base * 0.04,
        type: "DEDUCTION",
      },
      {
        concept: `Descuento ARL (${arl_percent}%)`,
        amount: base * (arl_percent / 100),
        type: "DEDUCTION",
      },
    ];

    for (const d of details) {
      await db.execute(
        `INSERT INTO payroll_details (payroll_id, concept, amount, type)
         VALUES (?, ?, ?, ?)`,
        [payroll_id, d.concept, d.amount, d.type]
      );
    }
  }

  async getDetails(payroll_id) {
    const [rows] = await db.execute(
      `SELECT concept, amount, type
       FROM payroll_details
       WHERE payroll_id = ?`,
      [payroll_id]
    );
    return rows;
  }
}
