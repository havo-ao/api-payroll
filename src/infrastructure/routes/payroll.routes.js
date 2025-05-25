import express from "express";
import {
  generatePayroll,
  getPayroll,
  getPayrollDetails,
} from "../../application/payroll.controller.js";

const router = express.Router();
router.post("/generate", generatePayroll);
router.get("/:employeeId/:year/:month", getPayroll);
router.get("/details/:payrollId", getPayrollDetails);

export default router;
