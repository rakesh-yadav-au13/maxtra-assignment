import express from "express";
import {
  AuthLogin,
  AuthSignup,
  ForgetPasswordRequest,
  ReSetPassword,
} from "../controlers/authControler";
import {
  isRequestValidate,
  ValidateLogin,
  validateSignup,
} from "../utils/validations";
const routes = express.Router();

routes.post("/signup", validateSignup, isRequestValidate, AuthSignup);

routes.post("/login", ValidateLogin, isRequestValidate, AuthLogin);

routes.post("/forget-password", ForgetPasswordRequest);

routes.post("/reset-password", ReSetPassword);

export default routes;
