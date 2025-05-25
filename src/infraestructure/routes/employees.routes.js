import express from "express";
import {
  registerEmployee,
  listEmployees,
} from "../../application/employees/employee.controller.js";

const router = express.Router();
router.post("/", registerEmployee);
router.get("/", listEmployees);

export default router;
