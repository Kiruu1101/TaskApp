import { StatusCodes } from "http-status-codes";
import UserModel from "../models/userModel.js";
import { COOKIE_MAX_AGE } from "../utils/constant.js";
import { BadRequestError } from "../errors/customErrors.js";
import { generateAndSendToken } from "../utils/utility.js";
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
  });

  generateAndSendToken(res, user, "User registered");
};
const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new BadRequestError("Invalid credentials");
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) throw new Error("Invalid credentials");

  generateAndSendToken(res, user, "User logged in");
};
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(StatusCodes.OK).json({ message: "User logged out" });
};
const updateUser = async (req, res) => {
  let userToUpdate = await UserModel.findOne({ _id: req.user._id });
  if (req.body.name && req.body.password) {
    const isOldPasswordCorrect = await userToUpdate.comparePassword(
      req.body.oldPassword
    );
    if (!isOldPasswordCorrect)
      throw new BadRequestError("Incorrect old Password");

    userToUpdate.name = req.body.name;
    userToUpdate.password = req.body.password;
  } else if (req.body.name) {
    userToUpdate.name = req.body.name;
  } else if (req.body.password) {
    const isOldPasswordCorrect = await userToUpdate.comparePassword(
      req.body.oldPassword
    );
    if (!isOldPasswordCorrect)
      throw new BadRequestError("Old password is incorrct");
    userToUpdate.password = req.body.password;
  }
  let newUser = await userToUpdate.save();
  const newUserWithoutPass = newUser.removePassword();
  res.status(StatusCodes.OK).json({ user: newUserWithoutPass });
};
export { registerUser, loginUser, logoutUser, updateUser };
