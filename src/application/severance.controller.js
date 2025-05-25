import { SeveranceService } from "../domain/severance/severance.service.js";

const service = new SeveranceService();

export const generateSeverance = async (req, res) => {
  try {
    const { employee_id, year, end_date } = req.body;
    const result = await service.generate(employee_id, year, end_date);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSeveranceByYear = async (req, res) => {
  try {
    const data = await service.getAllByYear(parseInt(req.params.year));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSeveranceByEmployee = async (req, res) => {
  try {
    const data = await service.getByEmployee(
      parseInt(req.params.employeeId),
      parseInt(req.params.year)
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
