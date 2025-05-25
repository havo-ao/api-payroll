import express from "express";
import {
  registerBonus,
  getBonusesByYear,
  getBonusesByEmployee,
} from "../../application/bonus.controller.js";

const router = express.Router();

router.post("/register", registerBonus);
router.get("/:year", getBonusesByYear);
router.get("/:employeeId/:year", getBonusesByEmployee);

export default router;
