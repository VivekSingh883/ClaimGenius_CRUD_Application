import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const login = async (username: string, password: string) => {
  // 1. Find user by username
  const result = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
  const user = result.rows[0];

  if (!user) throw new Error("User not found");

  // 2. Verify password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Invalid credentials");

  // 3. Generate JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // 4. Return token and user info
  return { token, user: { id: user.id, username: user.username, role: user.role } };
};
