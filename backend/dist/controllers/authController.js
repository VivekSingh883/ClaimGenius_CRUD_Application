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
exports.logout = exports.login = void 0;
const authService = __importStar(require("../services/authService"));
// login controller
const login = async (req, res) => {
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
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.login = login;
// Logout Controller Clears the cookie
const logout = async (req, res) => {
    try {
        // Clear cookie
        res.clearCookie("authToken");
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map