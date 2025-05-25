import express from "express";
import {
  getMonthlyReport,
  getEmployeeHistory,
  getEmployeeAnnualSummary,
} from "../../application/report.controller.js";

const router = express.Router();

router.get("/monthly/:year/:month", getMonthlyReport);
router.get("/employee/:employeeId", getEmployeeHistory);
router.get("/employee/:employeeId/:year", getEmployeeAnnualSummary);

export default router;
