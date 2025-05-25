import { ReportService } from "../../domain/reports/report.service.js";
const service = new ReportService();

export const getMonthlyReport = async (req, res) => {
  try {
    const result = await service.getMonthlyGlobal(
      parseInt(req.params.year),
      parseInt(req.params.month)
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeeHistory = async (req, res) => {
  try {
    const result = await service.getEmployeeHistory(
      parseInt(req.params.employeeId)
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeeAnnualSummary = async (req, res) => {
  try {
    const result = await service.getEmployeeAnnualSummary(
      parseInt(req.params.employeeId),
      parseInt(req.params.year)
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
