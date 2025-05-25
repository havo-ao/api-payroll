import { EmployeeRepository } from "./employee.repository.js";
import { Employee } from "./employee.entity.js";

export class EmployeeService {
  constructor() {
    this.repository = new EmployeeRepository();
  }

  async register(data) {
    const employee = new Employee(data);
    return await this.repository.create(employee);
  }

  async list() {
    return await this.repository.list();
  }
}
