import { PayrollService } from "../../domain/payroll/payroll.service.js";
const service = new PayrollService();

export const generatePayroll = async (req, res) => {
  const { employee_id, year, month } = req.body;

  try {
    const result = await service.generate({ employee_id, year, month });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
