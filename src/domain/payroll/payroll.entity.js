export class Payroll {
  constructor({
    employee_id,
    year,
    month,
    base_salary,
    transport_aid,
    total_earned,
    total_deductions,
    net_salary,
    arl_percent,
  }) {
    this.employee_id = employee_id;
    this.year = year;
    this.month = month;
    this.base_salary = base_salary;
    this.transport_aid = transport_aid;
    this.total_earned = total_earned;
    this.total_deductions = total_deductions;
    this.net_salary = net_salary;
    this.arl_percent = arl_percent;
  }
}
