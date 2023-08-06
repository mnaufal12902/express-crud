const User = require("../models/users.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ logging: false });
    res.json({
      message: "Get All Data Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error ",
      serverMessage: error,
    });
  }
};

const createUsers = async (req, res) => {
  const { body } = req;

  if (!body.Username || !body.Full_Name || !body.Email || !body.Password) {
    return res.status(400).json({
      message: "Masukkan data dengan benar",
    });
  }

  try {
    const data = await User.create(
      {
        Username: body.Username,
        Full_Name: body.Full_Name,
        Email: body.Email,
        Password: body.Password,
      },
      { logging: false }
    );
    res.status(201).json({
      message: "Create Data Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create Data Failed",
      serverMessage: error,
    });
  }
};

const updateUsers = async (req, res) => {
  const { body } = req;
  const { uid } = req.params;
  const searchUser = await User.findByPk(uid, { logging: false });

  if (searchUser === null) {
    res.status(400).json({
      message: "User tidak ditemukan",
    });
  } else {
    if (!body.Username || !body.Full_Name || !body.Email || !body.Password ) {
      return res.status(400).json({
        message: "Masukkan data dengan benar",
      });
    }

    try {
      await User.update(
        {
          Username: body.Username,
          Full_Name: body.Full_Name,
          Email: body.Email,
          Password: body.Password,
        },
        {
          where: {
            UID: uid,
          },
          logging: false,
        }
      );
      res.status(201).json({
        message: "Update User Success",
        data: body,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        serverMessage: error,
      });
    }
  }
};

const deleteUsers = async (req, res) => {
  const { uid } = req.params;
  const searchUser = await User.findByPk(uid, { logging: false });

  if (searchUser === null) {
    res.status(400).json({
      message: "Data tidak ditemukan",
    });
  } else {
    try {
      await User.destroy({
        where: {
          UID: uid,
        },
        logging: false,
      });
      res.json({
        message: "Delete User Success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        serverMessage: error,
      });
    }
  }
};

module.exports = {
  getAllUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
