import {
  MonthlyReport,
  EmployeePayrollRecord,
  EmployeeAnnualSummary,
} from "./report.entity.js";
import { ReportRepository } from "./report.repository.js";

export class ReportService {
  constructor() {
    this.repository = new ReportRepository();
  }

  async getMonthlyGlobal(year, month) {
    const data = await this.repository.getMonthlyGlobal(year, month);
    return new MonthlyReport(data);
  }

  async getEmployeeHistory(employee_id) {
    const rows = await this.repository.getEmployeeHistory(employee_id);
    return rows.map((r) => new EmployeePayrollRecord(r));
  }

  async getEmployeeAnnualSummary(employee_id, year) {
    const data = await this.repository.getEmployeeAnnualSummary(
      employee_id,
      year
    );
    return new EmployeeAnnualSummary(data);
  }
}
