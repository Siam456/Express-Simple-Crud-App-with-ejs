const { check, validationResult } = require('express-validator');

const stuvalidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check('email')
        .isEmail()
        .withMessage("Invalid email address")
        .trim(),
    check('phone')
        .isMobilePhone("bn-BD")
];

const checkvalidation = (req, res, next) => {
    const myval = validationResult(req);

    const result = myval.mapped();
    if(Object.keys(result).length === 0){
        next();
    } else{
        res.status(500).json({
            errors: result,
        })
    }
}

module.exports = {
    stuvalidator,
    checkvalidation
};