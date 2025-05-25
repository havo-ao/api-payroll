import { LegalBonusRepository } from "./bonus.repository.js";
import { LegalBonus } from "./bonus.entity.js";

export class LegalBonusService {
  constructor() {
    this.repository = new LegalBonusRepository();
  }

  async register({ employee_id, year, period }) {
    const exists = await this.repository.exists(employee_id, year, period);
    if (exists) throw new Error("Bonus already registered for this semester");

    const total = await this.repository.getTotalEarnedInSemester(
      employee_id,
      year,
      period
    );
    if (total === 0) throw new Error("No payroll data to calculate bonus");

    const amount = total / 2;
    const bonus = new LegalBonus({ employee_id, year, period, amount });
    const id = await this.repository.insert(
      bonus.employee_id,
      bonus.year,
      bonus.period,
      bonus.amount
    );

    return { id, ...bonus };
  }

  async listByYear(year) {
    return await this.repository.findByYear(year);
  }

  async listByEmployee(employee_id, year) {
    return await this.repository.findByEmployee(employee_id, year);
  }
}
