import { PayrollRepository } from "./payroll.repository.js";
import { Payroll } from "./payroll.entity.js";
import db from "../../infrastructure/db/mysql.connection.js";

export class PayrollService {
  constructor() {
    this.repository = new PayrollRepository();
  }

  async generate({ employee_id, year, month }) {
    const [empRows] = await db.execute(
      `SELECT hire_date FROM employees WHERE id = ?`,
      [employee_id]
    );
    if (empRows.length === 0) throw new Error("Employee not found");

    const hire = new Date(empRows[0].hire_date);
    const date = new Date(`${year}-${month}-01`);
    if (hire > date) throw new Error("Employee was not hired yet");

    const exists = await this.repository.checkExists(employee_id, year, month);
    if (exists) throw new Error("Payroll already exists for this period");

    const data = await this.repository.getPayrollData(employee_id, year);
    if (!data) throw new Error("Salary or social security data missing");

    const payroll = new Payroll({ employee_id, year, month, ...data });
    const id = await this.repository.insertPayroll(payroll);
    await this.repository.insertDetails(
      id,
      payroll.base_salary,
      payroll.transport_aid,
      payroll.arl_percent
    );

    return { id, ...payroll };
  }

  async getPayroll(employee_id, year, month) {
    return await this.repository.getPayroll(employee_id, year, month);
  }

  async getDetails(payroll_id) {
    return await this.repository.getDetails(payroll_id);
  }
}
