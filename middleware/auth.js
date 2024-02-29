const secret = process.env.SECRET_KEY;

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
