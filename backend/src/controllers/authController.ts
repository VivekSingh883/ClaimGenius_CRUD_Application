import { Request, Response } from "express";
import * as authService from "../services/authService";
import crypto from "crypto";

// Secret key (should be stored in .env)
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16; 

// Encrypt function
// function encrypt(text: string): string {
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   return iv.toString("hex") + ":" + encrypted; // store iv with data
// }


// login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Call service to validate user & return token
    const { token, user } = await authService.login(username, password);

 
    // Set cookie with token
    res.cookie("authToken", token, {
      httpOnly: true,   
      secure: false,    
      // sameSite: "lax",  
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

// Logout Controller Clears the cookie
 
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Clear cookie
    res.clearCookie("authToken");

    res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
