import express from "express";
import employeeRoutes from "../infrastructure/routes/employees.routes.js";

const app = express();
app.use(express.json());
app.use("/api/employees", employeeRoutes);

export default app;
