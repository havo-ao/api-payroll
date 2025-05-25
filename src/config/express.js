import express from "express";
import employeeRoutes from "../infrastructure/routes/employees.routes.js";
import payrollRoutes from "../infrastructure/routes/payroll.routes.js";

const app = express();
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/payroll", payrollRoutes);

export default app;
