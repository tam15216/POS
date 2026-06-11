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

const getStockHistory = async () => {
    const [rows] = await db.query(`
        SELECT 
            l.Log_id,
            l.Ingredient_id,
            l.Ref_type,
            l.Ref_id,
            l.Qty_change,
            l.Log_datetime,
            i.Ingredient_name
        FROM ingredient_stock_log l
        JOIN ingredient i ON l.Ingredient_id = i.Ingredient_id
        ORDER BY l.Log_id DESC
    `);
    return rows;
};

const updateIngredientStockOnly = async (conn, id, qtyChange) => {
    await conn.query(
        `UPDATE ingredient 
         SET Stock_qty = Stock_qty + ? 
         WHERE Ingredient_id = ?`,
        [qtyChange, id]
    );
};


const insertIngredientStockLog = async (conn, id, action_type, ref_id, qtyChange) => {
    const finalRefId = ref_id !== undefined && ref_id !== null && ref_id !== '' ? ref_id : null;

    await conn.query(
        `INSERT INTO ingredient_stock_log (Ingredient_id, Ref_type, Ref_id, Qty_change, Log_datetime)
         VALUES (?, ?, ?, ?, NOW())`,
        [id, action_type, finalRefId, qtyChange]
    );
};

module.exports = { insertIngredient, getAllIngredients , updateIngredient , deleteIngredient , getStockHistory , updateIngredientStockOnly , insertIngredientStockLog};