const userModel = require("../models/index").user;
const {
  ComparePassword,
  GeneratePassword,
} = require("../helpers/passwordHelpers");
const { GenerateToken } = require("../helpers/tokenHelpers");

exports.getAllUser = async (req, res) => {
  try {
    let dataUser = await userModel.findAll();

    const responseUsers = dataUser.map((user) => {
      const { id, firstname, lastname, email, role } = user;
      return {
        id,
        firstname,
        lastname,
        email,
        role,
      };
    });

    return res.status(200).json({
      success: true,
      data: responseUsers,
      message: "All users have been loaded",
    });
  } catch (error) {
    console.error("Error in getAllUser:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server Error",
    });
  }
};

exports.getUserById = async (req, res) => {
  let idUser = req.params.id;

  try {
    let dataUser = await userModel.findOne({ where: { id: idUser } });
    if (dataUser != null) {
      const { id, firstname, lastname, email, role } = dataUser;
      const responseUser = {
        id,
        firstname,
        lastname,
        email,
        role,
      };

      res.status(200).json(responseUser);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.register = async (req, res) => {
  let newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: await GeneratePassword(req.body.password),
  };

  try {
    await userModel.create(newUser);
    return res.json({
      success: true,
      data: "You cannot access this data",
      message: "New member has been created",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  let { email, password, newPassword } = req.body;

  try {
    const findUser = await userModel.findOne({
      where: { email: email },
    });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        status: result,
        message: "User not found",
      });
    }

    const isValidPassword = await ComparePassword(password, findUser.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        status: "Unauthorized",
        message: "Incorrect Password",
      });
    }

    const hashed = await GeneratePassword(newPassword);

    const result = await userModel.update(
      { password: hashed },
      { where: { email: email } }
    );

    return res.status(200).json({
      success: true,
      status: result,
      message: "Data user has been updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(501).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

exports.updateUserById = async (req, res) => {
  let idUser = req.params.id;
  let updatedUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
  };

  if (req.body.password) {
    updatedUser.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const result = await userModel.update(updatedUser, {
      where: { id: idUser },
    });

    if (result == 0) {
      return res.status(404).json({
        success: false,
        status: result,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: result,
      message: "Data user has been updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(501).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const idUser = req.params.id;

    const result = await userModel.destroy({ where: { id: idUser } });

    if (result === 1) {
      return res.status(200).json({
        success: true,
        message: "Data user has been deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.authenticate = async (req, res) => {
  let dataLogin = {
    email: req.body.email,
    password: req.body.password,
  };

  let dataUser = await userModel.findOne({ where: { email: dataLogin.email } });

  if (dataUser) {
    const passwordMatch = await ComparePassword(
      req.body.password,
      dataUser.password
    );

    if (passwordMatch) {
      const token = GenerateToken(dataLogin);
      dataUser.password = "you cannot access this data"

      return res.status(200).json({
        token: token,
        success: true,
        logged: true,
        data: dataUser,
        message: "Authentication Success",
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
