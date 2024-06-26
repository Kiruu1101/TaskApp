import { UnAuthenticatedError } from "../errors/customErrors.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";
dotenv.config();
export const authMiddleware = async (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token)
    throw new UnAuthenticatedError(
      "no permission to request this private route, token missing"
    );

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decode.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Invalid token");
  }
};
