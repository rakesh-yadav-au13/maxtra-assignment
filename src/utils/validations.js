import { check, validationResult } from "express-validator";

export const validateSignup = [
  check("name").not().isEmpty().withMessage("Name field cannot be empty"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email field cannot be empty")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password field cannotbe empty"),
];

export const ValidateLogin = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email field cannot be empty")
    .isEmail()
    .withMessage("Email is not a valid email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password field cannot be empty"),
];

export const isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
