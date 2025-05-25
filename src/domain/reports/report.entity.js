export class MonthlyReport {
  constructor({
    year,
    month,
    total_employees,
    total_earned,
    total_deductions,
    total_net,
  }) {
    this.year = year;
    this.month = month;
    this.total_employees = total_employees;
    this.total_earned = total_earned;
    this.total_deductions = total_deductions;
    this.total_net = total_net;
  }
}

export class EmployeePayrollRecord {
  constructor({ year, month, total_earned, total_deductions, net_salary }) {
    this.year = year;
    this.month = month;
    this.total_earned = total_earned;
    this.total_deductions = total_deductions;
    this.net_salary = net_salary;
  }
}

export class EmployeeAnnualSummary {
  constructor({
    employee_id,
    year,
    total_earned,
    total_deductions,
    total_net,
  }) {
    this.employee_id = employee_id;
    this.year = year;
    this.total_earned = total_earned;
    this.total_deductions = total_deductions;
    this.total_net = total_net;
  }
}
