const service = require("./user.service");

const getUsers = async (req, res) => {
  try {
    const data = await service.getUsers();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    await service.createUser(req.body);

    res.json({
      message: "User created",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const toggleUser = async (req, res) => {
  try {
    await service.toggleUser(req.params.id);

    res.json({
      message: "User updated",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  toggleUser,
};
