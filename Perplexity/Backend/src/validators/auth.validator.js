import { body, validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json({
        message: 'Validation failed',
        errors: errors.array().map(({ path, msg }) => ({
            field: path,
            message: msg,
        })),
    });
};

const registerValidator = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long')
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username may contain only letters, numbers, and underscores'),

    body('email')
        .isString()
        .withMessage('Email must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .isLength({ min: 6, max: 128 })
        .withMessage('Password must be between 6 and 128 characters long')
        .bail()
        .matches(/\S/)
        .withMessage('Password cannot contain only whitespace'),
        
    validateRequest,
];

const loginValidator = [
    body('email')
        .isString()
        .withMessage('Email must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .isLength({ min: 6, max: 128 })
        .withMessage('Password must be between 6 and 128 characters long')
        .bail()
        .matches(/\S/)
        .withMessage('Password cannot contain only whitespace'),
        
    validateRequest,
];

export { registerValidator, loginValidator };
