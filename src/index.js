import app from "./config/express.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
