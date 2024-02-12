const { validationResult, body } = require(`express-validator`);

const validateUser = [
    body('firstname').notEmpty().withMessage('First Name is required'),
    body('lastname').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errMessage = errors.array().map(it => it.message).join(",")
            
            return res.status(422).json({
                success: false,
                message: errMessage
            })
        }
        next();
    }
];

module.exports = { validateUser }

