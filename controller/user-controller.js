const userModel = require("../models/index").user;
const bcrypt = require("bcrypt");

exports.getAllUser = async (req, res) => {
  try {
    let dataUser = await userModel.findAll();

    return res.status(200).json({
      success: true,
      data: dataUser,
      message: "All User have been loaded",
    });
  } catch (error) {
    console.error("Error in getAllUser:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Data user is empty",
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

exports.addUser = async (req, res) => {
  let newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  try {
    const result = await userModel.create(newUser);
    return res.json({
      success: true,
      data: result,
      message: "New member has been inserted",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
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

exports.changePassword = async (req, res) => {
  let idUser = req.params.id;

  let dataUser = {
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  };

  try {
    if (!dataUser.currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required for updating user",
      });
    }

    const existingUser = await userModel.findOne({ where: { id: idUser } });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isPasswordValid = bcrypt.compareSync(
      dataUser.currentPassword,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (dataUser.newPassword) {
      const isNewPassword = bcrypt.compareSync(
        dataUser.newPassword,
        existingUser.password
      );

      if (isNewPassword) {
        return res.status(400).json({
          success: false,
          message: "New password cannot be the same as the current password",
        });
      }

      dataUser.password = bcrypt.hashSync(dataUser.newPassword, 10);
    } else {
      return res.status(400).json({
        success: false,
        message: "Field 'newPassword' cannot be empty.",
      });
    }

    const result = await userModel.update(dataUser, {
      where: { id: idUser },
    });

    return res.status(201).json({
      success: true,
      status: result,
      message: "Password has been updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* MODUL
exports.deleteUser = async (req, res) => {
  let idUser = req.params.id;
  try {
    userModel
      .destroy({ where: { id: idUser } })
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: "Data user has been deleted",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; */

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
