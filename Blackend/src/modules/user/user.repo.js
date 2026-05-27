const db = require("../../config/database");

const getUsers = async () => {
  const [rows] = await db.query(
    `
        SELECT
            User_id,
            Username,
            Full_name,
            Role,
            is_active,
            Created_at
        FROM User
        ORDER BY User_id DESC
        `,
  );

  return rows;
};


const createUser = async (data) => {
  await db.query(
    `
        INSERT INTO User
        (
            Username,
            Password_hash,
            Full_name,
            Role
        )
        VALUES (?, ?, ?, ?)
        `,
    [data.username, data.password_hash, data.full_name, data.role],
  );
};

const toggleUser = async (id) => {
  await db.query(
    `
        UPDATE User
        SET is_active = NOT is_active
        WHERE User_id = ?
        `,
    [id],
  );
};

module.exports = {
  getUsers,
  createUser,
  toggleUser,
};
