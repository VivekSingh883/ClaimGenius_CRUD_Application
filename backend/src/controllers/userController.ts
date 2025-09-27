import { Request, Response } from "express";
import * as userService from "../services/userService";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const sortBy = (req.query.sortBy as string) || "id";
    const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

    const { users, totalUsers } = await userService.getAllUsers({
      query: search,
      page,
      limit,
      sortBy,
      order: sortOrder,
    });

    res.status(200).json({
      users,
      total: totalUsers,
      page,
      limit,
    });
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUserById:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Basic inline validation
    if (!req.body.name || !req.body.email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }

    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error in createUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const updatedUser = await userService.updateUser(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error in updateUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};
