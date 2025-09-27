"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const login = async (username, password) => {
    // 1. Find user by username
    const result = await db_1.pool.query("SELECT * FROM admins WHERE username = $1", [username]);
    const user = result.rows[0];
    if (!user)
        throw new Error("User not found");
    // 2. Verify password
    const isMatch = await bcrypt_1.default.compare(password, user.password_hash);
    if (!isMatch)
        throw new Error("Invalid credentials");
    // 3. Generate JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    // 4. Return token and user info
    return { token, user: { id: user.id, username: user.username, role: user.role } };
};
exports.login = login;
//# sourceMappingURL=authService.js.map