export class Employee {
  constructor({ document, full_name, position_id, department_id, hire_date }) {
    this.document = document;
    this.full_name = full_name;
    this.position_id = position_id;
    this.department_id = department_id;
    this.hire_date = hire_date;
    this.status = "ACTIVE";
  }
}
