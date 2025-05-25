import express from "express";
import employeeRoutes from "../infrastructure/routes/employees.routes.js";
import payrollRoutes from "../infrastructure/routes/payroll.routes.js";
import bonusRoutes from "../infrastructure/routes/legalBonus.routes.js";
import annualBonusRoutes from "../infrastructure/routes/bonus.routes.js";
import reportRoutes from "../infrastructure/routes/report.routes.js";

const app = express();
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/legal-bonuses", bonusRoutes);
app.use("/api/bonuses", annualBonusRoutes);
app.use("/api/reports", reportRoutes);

export default app;
