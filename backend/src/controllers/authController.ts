import { Request, Response } from "express";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body; 
    const data = await authService.login(username, password);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
