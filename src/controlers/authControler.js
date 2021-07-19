import UserSchema from "../models/schemas/UserSchema";
import OtpSchema from "../models/schemas/OtpSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeMailer from "./NodeMailer";

export const AuthSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await UserSchema.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: req.body.email,
            msg: "User already exist",
            param: "email",
            location: "body",
          },
        ],
        message: "User already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = new UserSchema({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(200).json({
      success: true,
      data: {},
      errors: [],
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const AuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: req.body.email,
            msg: "Invalid credentials",
            param: "email",
            location: "body",
          },
        ],
        message: "Invalid credentials",
      });
    }
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: req.body.password,
            msg: "Invalid credentials",
            param: "password",
            location: "body",
          },
        ],
        message: "Invalid credentials",
      });
    }
    const logintoken = jwt.sign({ id: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      data: logintoken,
      errors: [],
      message: "Login successfully!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const ForgetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: email,
            msg: "User not exist",
            param: "email",
            location: "body",
          },
        ],
        message: "User not exist",
      });
    }
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new OtpSchema({
      email,
      otpcode,
    });

    await otpData.save();
    await nodeMailer(email, otpcode);
    return res.status(400).json({
      success: true,
      data: otpcode,
      errors: [],
      message: "Please check your Email",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const ReSetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    let checkOtp = await OtpSchema.find({ otpcode: otp, email: email });
    console.log(checkOtp);
    if (!checkOtp.length) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: otp,
            msg: "OTP is incorrect",
            param: "otp",
            location: "body",
          },
        ],
        message: "Incorrect otp",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await UserSchema.findOneAndUpdate(
      { email: email },
      { password: hashPassword }
    );
    return res.status(200).json({
      success: true,
      data: {},
      errors: [],
      message: "Password reset successfully",
    });
  } catch (error) {}
};
