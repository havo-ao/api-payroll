# Payroll Management System (Colombian Regulation) – Backend API

This project is a fully functional backend for managing payroll operations under Colombian labor regulations. It includes monthly payroll generation, legal and voluntary bonuses, and annual reporting using a clean architecture with raw SQL and no ORMs.

## 📦 Modules Implemented

The system is divided into the following functional modules:

1. **Employees**

   - Register and list company employees
   - Assign position and department

2. **Salaries**

   - Assign salary and transport aid per year per employee
   - Validate per-year registration to avoid duplication

3. **Payroll**

   - Generate monthly payrolls based on current salary
   - Automatically calculate deductions (health, pension, ARL)
   - Store totals and breakdowns

4. **Payroll Details**

   - Store itemized breakdown: base salary, transport aid, deductions
   - Consult details by payroll ID

5. **Legal Bonuses (Primas)**

   - Generate June and December legal bonuses based on semester earnings
   - Register only once per semester/year per employee

6. **Voluntary Bonuses**

   - Register annual bonuses manually with justification
   - Consult per year or per employee

7. **Reports**
   - Monthly global summary of payroll
   - Payroll history for individual employees
   - Yearly summary per employee

## ✅ Features

- Register employees and assign positions/departments
- Manage yearly salary per employee (including transport aid)
- Generate monthly payroll with earnings and deductions (health, pension, ARL)
- Store and view detailed payroll breakdown
- Handle **legal bonuses** (prima) per semester (June, December)
- Register and consult **voluntary bonuses**
- Generate monthly and yearly payroll reports
- Architecture follows **Domain-Driven Design (DDD)**
- All logic runs with **pure SQL using `mysql2/promise`**

## 🧱 Tech Stack

- Node.js v20 (ECMAScript 2020)
- Express.js
- MariaDB (connected via DBeaver or Postman)
- SQL queries only — no ORM, no stored procedures
- DDD pattern: `entity`, `repository`, `service`, `controller`, `routes`

## 📁 Project Structure

```
src/
├── domain/           # Business logic, entities
├── application/      # Controllers
├── infrastructure/
│   ├── routes/       # Routes per module
│   └── db/           # MariaDB connection
├── config/           # Express app config
└── index.js          # App entry point
```

## ⚙️ Setup Instructions

### 1. Clone the project and install dependencies

```bash
git clone https://github.com/havo-ao/api-payroll
cd api-payroll
npm install
```

### 2. Add `.env` file in root directory

```dotenv
PORT=3000
DB_HOST=172.16.93.131
DB_USER=your_user           # Configure your user in order of your own configs
DB_PASSWORD=your_password   # Configure your pass in order of your own configs
DB_NAME=payroll
```

### 3. Start the server

```bash
node src/index.js
```

> Server should run at: `http://localhost:3000`

## 🔌 API Endpoints

### 🧑 Employees

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/api/employees` | Create employee    |
| GET    | `/api/employees` | List all employees |

### 💰 Salaries

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/api/employees/:id/salary` | Register salary for year |
| GET    | `/api/employees/:id/salary` | List employee salaries   |

### 🧾 Payroll

| Method | Endpoint                                | Description                  |
| ------ | --------------------------------------- | ---------------------------- |
| POST   | `/api/payroll/generate`                 | Generate monthly payroll     |
| GET    | `/api/payroll/:employeeId/:year/:month` | Get payroll by employee/date |
| GET    | `/api/payroll/details/:payrollId`       | Get payroll breakdown        |

### 🎁 Legal Bonuses (Prima)

| Method | Endpoint                               | Description               |
| ------ | -------------------------------------- | ------------------------- |
| POST   | `/api/legal-bonuses/register`          | Register semiannual bonus |
| GET    | `/api/legal-bonuses/:year`             | Get all for year          |
| GET    | `/api/legal-bonuses/:employeeId/:year` | Get by employee/year      |

### 🎖️ Voluntary Bonuses

| Method | Endpoint                         | Description           |
| ------ | -------------------------------- | --------------------- |
| POST   | `/api/bonuses/register`          | Register annual bonus |
| GET    | `/api/bonuses/:year`             | List all for year     |
| GET    | `/api/bonuses/:employeeId/:year` | List by employee/year |

### 📊 Reports

| Method | Endpoint                                  | Description            |
| ------ | ----------------------------------------- | ---------------------- |
| GET    | `/api/reports/monthly/:year/:month`       | Monthly global summary |
| GET    | `/api/reports/employee/:employeeId`       | Payroll history        |
| GET    | `/api/reports/employee/:employeeId/:year` | Yearly summary         |

## 🧪 Testing the API

- Use [Postman](https://www.postman.com/) to test each endpoint.
- JSON payloads are expected for `POST` requests.
- All endpoints return consistent and structured responses.

## 📌 Notes

- All calculations (payroll totals, deductions, bonuses) are executed in SQL queries.
- The backend follows a modular and scalable architecture for future growth.
- No data creation endpoints for departments or ARL are included (insert via SQL scripts).

## 👨‍💻 Author

Developed by: **Andrés Cañón - Ángel Álvarez - Justin Narváez**
University: **Universidad El Bosque**  
Subject: **Database 1 Final Project**  
Instructor: **Christian Duarte**
