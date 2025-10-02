import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cookieParser());  
app.use(express.json());

app.use(cors(
  {origin: 'http://localhost:5173', credentials: true}
));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Server
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
