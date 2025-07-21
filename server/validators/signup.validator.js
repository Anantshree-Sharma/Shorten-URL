import { check } from "express-validator";
import { validationResult } from "express-validator";

const signupValidation = [
  check("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  check("email").isEmail().withMessage("Enter a valid email"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must have one upper case letter")
    .matches(/[a-z]/)
    .withMessage("Password must have one lower case letter")
    .matches(/[0-9]/)
    .withMessage("Password must have one number")
    .matches(/[~!@#$%^&*()_+={};:'",<.>/?]/)
    .withMessage("Password must have one special character"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = errors.array().map((err) => err.msg);
      return res.status(400).json({
        errors: errMsg[0],
        prevInputs: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }
    next();
  },
];

export default signupValidation;
