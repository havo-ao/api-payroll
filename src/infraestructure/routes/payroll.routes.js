import express from "express";
import { generatePayroll } from "../../application/payroll/payroll.controller.js";

const router = express.Router();
router.post("/generate", generatePayroll);

export default router;
