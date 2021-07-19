import jwt from "jsonwebtoken";
import UserSchema from "../models/schemas/UserSchema";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        data: {},
        error: [
          {
            value: "token",
            msg: "Login first",
            param: "token",
            location: "headers",
          },
        ],
        message: "Please login!!",
      });
    }

    const decode = jwt.verify(token, process.env.jwt_secret);
    const userData = await UserSchema.findById(decode.id, {
      password: 0,
    });
    if (!userData) {
      return res.status(400).json({
        data: {},
        errors: [],
        message: "Not a valid user!",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default isAuth;
