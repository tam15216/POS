const bcrypt = require("bcrypt");

const repo = require("./user.repo");
const authRepo = require("../auth/auth.repo");

const getUsers = async () => {
  return await repo.getUsers();
};

const createUser = async (data) => {
  if (!data.username || !data.password || !data.full_name || !data.role) {
    throw new Error("All fields required");
  }

  const existingUser = await authRepo.findByUsername(data.username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await repo.createUser({
    username: data.username,
    password_hash: hashedPassword,
    full_name: data.full_name,
    role: data.role,
  });
};

const toggleUser = async (id) => {
  const user = await repo.findById(id);

  if (!user) {
    throw new Error("User not found");
  }
  if (user.Role === "admin" && user.is_active) {
    const totalAdmins = await repo.countActiveAdmins();
    if (totalAdmins <= 1) {
      throw new Error("Cannot disable last admin");
    }
  }
  return await repo.toggleUser(id);
};

module.exports = {
  getUsers,
  createUser,
  toggleUser,
};
