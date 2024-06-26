import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/usercontroller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  validateLoginInput,
  validateRegisterInput,
  validateUpdateUserInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();
router.route("/login").post(validateLoginInput, loginUser);
router.route("/logout").post(logoutUser);
router.route("/register").post(validateRegisterInput, registerUser);
router
  .route("/update")
  .patch(authMiddleware, validateUpdateUserInput, updateUser);

export default router;
