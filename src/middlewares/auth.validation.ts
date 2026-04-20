import { body } from "express-validator";
import { AUTH_ROLES } from "../services/auth.service";
import { validate } from "../utils/validate";

const allowedRoles = AUTH_ROLES.join(", ");

export const registerValidation = validate([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nama wajib diisi"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .bail()
    .isEmail()
    .withMessage("Format email tidak valid")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("role")
    .optional()
    .trim()
    .customSanitizer((value) => value.toUpperCase())
    .isIn([...AUTH_ROLES])
    .withMessage(`Role harus salah satu dari: ${allowedRoles}`),
]);

export const loginValidation = validate([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .bail()
    .isEmail()
    .withMessage("Format email tidak valid")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi"),
]);
