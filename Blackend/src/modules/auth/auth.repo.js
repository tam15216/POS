const db = require('../../config/database');

const findByUsername = async (username) => {
    const [rows] = await db.query(
        `SELECT * FROM User WHERE Username = ?`,
        [username]
    );
    return rows[0];
};

const createUser = async (data) =>{
    const [result] = await db.query(
        `INSERT INTO User (Username, Password_hash, Role , Full_name) VALUES (?, ?, ?, ?)`,
        [data.username, data.password_hash, data.role, data.full_name]
    );
    return result.insertId;
}

const findById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM User
        WHERE User_id = ?
        `,
        [id]
    );

    return rows[0];
};

module.exports = { findByUsername, createUser, findById };