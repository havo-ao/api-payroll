import express from "express";
import {
  generateSeverance,
  getSeveranceByYear,
  getSeveranceByEmployee,
} from "../../application/severance.controller.js";

const router = express.Router();

router.post("/generate", generateSeverance);
router.get("/:year", getSeveranceByYear);
router.get("/:employeeId/:year", getSeveranceByEmployee);

export default router;
