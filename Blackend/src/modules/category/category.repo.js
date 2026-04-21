const db = require('../../config/database');

const createCategory = async (name) => {
    const [result] = await db.query(
        'INSERT INTO Category (Category_name) VALUES (?)',
        [name]
    );
    return result;
};

module.exports = { createCategory } ;