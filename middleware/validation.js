/* Modul 
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
*/

const Validator = require("validatorjs");
const userModels = require("../models/index").user;

exports.ValidateRegister = async (req, res, next) => {
  try {
    let newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password
    };

    const rules = (Validator.Rules = {
      firstname: "required|string|max:20",
      lastname: "required|string|max:20",
      email: "required|email",
      role: "required",
      password: "required|min:10|alpha_num"
    });

    const validate = new Validator(newUser, rules);

    if(validate.fails()){
        return res.status(400).json({
            success: false,
            message: "Bad Request",
            error: validate.errors
        })
    }

    const userData = await userModels.findOne({ where: { email: newUser.email }})

    if (userData) {
        const errorMessage = {
            errors: {
                email: [
                    "Email already Used"
                ]
            }
        }
        return res.status(400).json({
            success: false,
            message: "Bad Request",
            error: errorMessage
        })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.IsUser = async (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role == "user") {
      next();
    }
    else{
        return res.status(403).json({
            success: false,
            auth: false,
            message: `Forbidden! You are Not User`
        })
    }
  }

exports.IsAdmin = async (req, res, next) => {
    if (req.user.role == "admin") {
        next();
    }
    else{
        return res.status(403).json({
            success: false,
            auth: false,
            message: `Forbidden! You are Not Admin`
        })
    }
  }
