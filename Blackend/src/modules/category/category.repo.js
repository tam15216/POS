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

const deleteCategory = async (id) => {
    const [result] = await db.query(
        'DELETE FROM Category WHERE Category_id = ?',
        [id]
    );
    return result;
};

module.exports = { createCategory, getAllCategories, deleteCategory };