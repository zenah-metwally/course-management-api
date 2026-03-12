const { body } = require("express-validator");

const validationSchema = [
      body("title")
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 2 })
        .withMessage("title atleast 2 characters"),
      body("price").notEmpty().withMessage("price is required"),
    ];

    module.exports = validationSchema;