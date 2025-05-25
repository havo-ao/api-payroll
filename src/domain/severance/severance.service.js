import { Severance } from "./severance.entity.js";
import { SeveranceRepository } from "./severance.repository.js";

export class SeveranceService {
  constructor() {
    this.repository = new SeveranceRepository();
  }

  async generate(employee_id, year, end_date = null) {
    const exists = await this.repository.alreadyExists(employee_id, year);
    if (exists) throw new Error("Severance already generated for this year");

    const info = await this.repository.getEmployeeInfo(employee_id);
    const salaryData = await this.repository.getAnnualSalaryData(
      employee_id,
      year
    );
    if (!info || !salaryData)
      throw new Error("Missing employee or salary data");

    const severance = new Severance({
      employee_id,
      year,
      hire_date: info.hire_date,
      salary: salaryData.base_salary,
      transport_aid: salaryData.transport_aid,
      end_date,
    });

    const id = await this.repository.insert(
      employee_id,
      year,
      severance.severance_amount,
      severance.interest_amount
    );

    return { id, ...severance };
  }

  async getAllByYear(year) {
    return await this.repository.getAllByYear(year);
  }

  async getByEmployee(employee_id, year) {
    return await this.repository.getByEmployee(employee_id, year);
  }
}
