const db = require('../../config/database');

const insertIngredient = async (data) => {
    const [result] = await db.query(
        `INSERT INTO ingredient (Ingredient_name, Stock_qty, Unit, Minimum_qty) 
         VALUES (?, ?, ?, ?)`,
        [data.Ingredient_name, data.Stock_qty, data.Unit, data.Minimum_qty]
    );
    return { Ingredient_id: result.insertId, ...data };
};

const getAllIngredients = async () => {
    const [rows] = await db.query(
        'SELECT * FROM ingredient ORDER BY Ingredient_id DESC'
    );
    return rows;
};

const updateIngredient = async (id, data) => {
    await db.query(
        `UPDATE ingredient 
         SET Ingredient_name = ?, Stock_qty = ?, Unit = ?, Minimum_qty = ?
         WHERE Ingredient_id = ?`,
        [data.Ingredient_name, data.Stock_qty, data.Unit, data.Minimum_qty, id]
    );
    return { Ingredient_id: id, ...data };
};

const deleteIngredient = async (id) => {
    await db.query(
        'DELETE FROM ingredient WHERE Ingredient_id = ?',
        [id]
    );
    return { message: 'Delete ingredient success' };
};

module.exports = { insertIngredient, getAllIngredients , updateIngredient , deleteIngredient};