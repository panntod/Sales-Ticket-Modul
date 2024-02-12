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

