const db = require('../../config/database');

const createCategory = async (category_name) => {
    const [result] = await db.query(
        'INSERT INTO Category (Category_name) VALUES (?)',
        [category_name]
    );
    return result;
};

const getAllCategories = async () => {
    const [rows] = await db.query('SELECT * FROM Category');
    return rows;
};

const getnotAllCategories = async () => {
    const [rows] = await db.query(`SELECT Category_id , Category_name FROM Category WHERE Status = 1`);
    return rows;
};


const toggleCategory = async (id) => {
    const [result] = await db.query(
        'UPDATE Category SET Status = NOT Status WHERE Category_id = ?',
        [id]
    );
    return result;
};

module.exports = { createCategory, getAllCategories, toggleCategory , getnotAllCategories };