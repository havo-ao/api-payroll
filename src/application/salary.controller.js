import { SalaryService } from "../domain/salaries/salary.service.js";

const service = new SalaryService();

export const registerSalary = async (req, res) => {
  const employee_id = parseInt(req.params.id);
  const { year, base_salary, transport_aid } = req.body;

  try {
    const id = await service.register(employee_id, {
      year,
      base_salary,
      transport_aid,
    });
    res.status(201).json({ id, message: "Salary registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listSalaries = async (req, res) => {
  const employee_id = parseInt(req.params.id);

  try {
    const salaries = await service.list(employee_id);
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
