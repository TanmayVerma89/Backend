import { body, validationResult } from "express-validator";

function validate(req, res, next) {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next()
    }

    res.status(409).json({
        res: errors.array()
    });
}

export const authValidator = [

    body('username').isString().withMessage('Username should be string'),
    body('email').isEmail().withMessage('Email should be valid'),
    body('password').isLength().withMessage('Email should be valid'),
    validate

]