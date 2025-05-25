import { EmployeeService } from "../domain/employees/employee.service.js";

const service = new EmployeeService();

export const registerEmployee = async (req, res) => {
  try {
    const id = await service.register(req.body);
    res.status(201).json({ id, message: "Employee created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listEmployees = async (req, res) => {
  try {
    const employees = await service.list();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
