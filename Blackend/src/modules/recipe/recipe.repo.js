const db =require('../../config/database');
const deleteRecipeByProductId = async (conn, productId) => {
    await conn.query(
        'DELETE FROM product_ingredient WHERE Product_id = ?',
        [productId]
    );
};

const insertRecipeItem = async (conn, productId, item) => {
    await conn.query(
        `INSERT INTO product_ingredient (Product_id, Ingredient_id, Quantity_used) 
         VALUES (?, ?, ?)`,
        [productId, item.ingredient_id, item.quantity_used]
    );
};

const getRecipeByProductId = async (productId) => {
    const [rows] = await db.query(
        `SELECT Ingredient_id AS ingredient_id, Quantity_used AS quantity_used 
         FROM product_ingredient 
         WHERE Product_id = ?`,
        [productId]
    );
    return rows;
};



module.exports = { deleteRecipeByProductId, insertRecipeItem , getRecipeByProductId };