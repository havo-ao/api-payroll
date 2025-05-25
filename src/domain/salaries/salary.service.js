import { SalaryRepository } from "./salary.repository.js";
import { Salary } from "./salary.entity.js";

export class SalaryService {
  constructor() {
    this.repository = new SalaryRepository();
  }

  async register(employee_id, data) {
    const salary = new Salary(data);
    return await this.repository.create(employee_id, salary);
  }

  async list(employee_id) {
    return await this.repository.listByEmployee(employee_id);
  }
}
