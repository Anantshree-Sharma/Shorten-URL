import { check } from "express-validator";

const urlValidation = [
  check("url")
    .notEmpty()
    .withMessage("Field Empty - Please Enter the Url")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("Invalid Protocol - Url must start with http:// or https://"),
];

export default urlValidation;
