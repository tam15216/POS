const db = require('../../config/database');

const createCategory = async (name) => {
    const [result] = await db.query(
        'INSERT INTO Category (Category_name) VALUES (?)',
        [name]
    );
    return result;
};

const getAllCategories = async () => {
    const [rows] = await db.query('SELECT * FROM Category');
    return rows;
};

module.exports = { createCategory, getAllCategories };