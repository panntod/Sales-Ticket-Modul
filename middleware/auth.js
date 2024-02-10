const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/index").user;

const secret = process.env.SECRET_KEY;

exports.authenticate = async (req, res) => {
  let dataLogin = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  };

  let dataUser = await userModel.findOne({ where: { email: dataLogin.email } });

  if (dataUser) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      dataUser.password
    );

    if (passwordMatch) {
      let payload = JSON.stringify(dataUser);
      console.log(payload);

      let token = jwt.sign(payload, secret);

      return res.status(200).json({
        success: true,
        logged: true,
        message: "Authentication Success",
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        logged: false,
        message: "Invalid Password",
      });
    }
  }

  return res.status(500).json({
    success: false,
    logged: false,
    message: "Authentication Failed.",
  });
};

exports.authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    /** verify token using jwt */
    let verifiedUser = jwt.verify(token, secret);
    if (!verifiedUser) {
      return res.json({
        success: false,
        auth: false,
        message: `User Unauthorized`,
      });
    }

    req.user = verifiedUser;

    next();
  } else {
    return res.status(401).json({
      success: false,
      auth: false,
      message: `User Unauthorized`,
    });
  }
};
