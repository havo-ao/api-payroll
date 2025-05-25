import express from "express";
import {
  generatePayroll,
  getPayroll,
} from "../../application/payroll/payroll.controller.js";

const router = express.Router();
router.post("/generate", generatePayroll);
router.get("/:employeeId/:year/:month", getPayroll);

export default router;
