import { Router } from "express";
import { login, logout, register } from "../controllers/userController.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/register").post(validateRegister, register);
router.route("/login").post(validateLogin, login);
router.route("/logout").get(logout);

export default router;
