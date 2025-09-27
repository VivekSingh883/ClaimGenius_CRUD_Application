"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validation/userValidation");
const router = (0, express_1.Router)();
router.get("/", userController_1.getUsers);
router.get("/:id", userController_1.getUserById);
router.post("/", userValidation_1.validateUser, userController_1.createUser);
router.put("/:id", userValidation_1.validateUser, userController_1.updateUser);
router.delete("/:id", userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map