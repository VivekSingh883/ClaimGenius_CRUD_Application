"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const userService = __importStar(require("../services/userService"));
// Get all users
const getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "id";
        const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
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
    }
    catch (err) {
        console.error("Error in getUsers:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getUsers = getUsers;
// Get user by ID
const getUserById = async (req, res) => {
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
    }
    catch (err) {
        console.error("Error in getUserById:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getUserById = getUserById;
// Create new user
const createUser = async (req, res) => {
    try {
        // Basic inline validation
        if (!req.body.name || !req.body.email) {
            res.status(400).json({ message: "Name and email are required" });
            return;
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createUser = createUser;
// Update user
const updateUser = async (req, res) => {
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
    }
    catch (err) {
        console.error("Error in updateUser:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res) => {
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
    }
    catch (err) {
        console.error("Error in deleteUser:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map