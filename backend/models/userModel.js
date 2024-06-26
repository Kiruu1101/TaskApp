import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
UserSchema.methods.removePassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
UserSchema.methods.createJwt = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.JWT_SECRET
  );
};
// this hook gets triggered when doc gets save
// thats why i had implemented update password in certain way
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatched = await bcrypt.compare(
    String(enteredPassword),
    this.password
  );
  return isMatched;
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
