export class Severance {
  constructor({
    employee_id,
    year,
    salary,
    transport_aid,
    hire_date,
    end_date,
  }) {
    this.employee_id = employee_id;
    this.year = year;
    this.salary = Number(salary);
    this.transport_aid = Number(transport_aid);
    this.hire_date = new Date(hire_date);
    this.end_date = end_date
      ? new Date(end_date)
      : new Date(`${this.year}-12-31`);
    this.days = this.calculateDaysWorked();
    this.severance_amount = this.calculateSeverance();
    this.interest_amount = this.calculateInterest();
  }

  calculateDaysWorked() {
    const start =
      this.hire_date > new Date(`${this.year}-01-01`)
        ? this.hire_date
        : new Date(`${this.year}-01-01`);

    const end =
      this.end_date < new Date(`${this.year}-12-31`)
        ? this.end_date
        : new Date(`${this.year}-12-31`);

    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return Math.floor(diff + 1);
  }

  calculateSeverance() {
    const base = this.salary + this.transport_aid;
    return parseFloat(((base * this.days) / 360).toFixed(2));
  }

  calculateInterest() {
    return parseFloat(
      ((this.severance_amount * 0.12 * this.days) / 360).toFixed(2)
    );
  }
}
