import { PayrollService } from "../domain/payroll/payroll.service.js";

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

export const getPayroll = async (req, res) => {
  const { employeeId, year, month } = req.params;

  try {
    const payroll = await service.getPayroll(
      parseInt(employeeId),
      parseInt(year),
      parseInt(month)
    );
    if (!payroll)
      return res
        .status(404)
        .json({ message: "No payroll found for this period" });
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPayrollDetails = async (req, res) => {
  const payroll_id = parseInt(req.params.payrollId);

  try {
    const details = await service.getDetails(payroll_id);
    if (details.length === 0) {
      return res
        .status(404)
        .json({ message: "No details found for this payroll ID" });
    }
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
