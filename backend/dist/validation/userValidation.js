"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateUser = [
    (0, express_validator_1.body)("first_name").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("last_name").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("dob").notEmpty().withMessage("Date Of Birth is required"),
    (0, express_validator_1.body)("mobile")
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone number must be 10 digits"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
//# sourceMappingURL=userValidation.js.map