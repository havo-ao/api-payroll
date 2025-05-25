import { BonusRepository } from "./bonus.repository.js";
import { Bonus } from "./bonus.entity.js";

export class BonusService {
  constructor() {
    this.repository = new BonusRepository();
  }

  async register(data) {
    const bonus = new Bonus(data);
    const id = await this.repository.insert(bonus);
    return { id, ...bonus };
  }

  async listByYear(year) {
    return await this.repository.findByYear(year);
  }

  async listByEmployee(employee_id, year) {
    return await this.repository.findByEmployee(employee_id, year);
  }
}
