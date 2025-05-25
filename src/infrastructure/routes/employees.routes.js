import express from "express";
import {
  registerEmployee,
  listEmployees,
} from "../../application/employee.controller.js";
import {
  registerSalary,
  listSalaries,
} from "../../application/salary.controller.js";

const router = express.Router();
router.post("/", registerEmployee);
router.get("/", listEmployees);
router.post("/:id/salary", registerSalary);
router.get("/:id/salary", listSalaries);

export default router;
