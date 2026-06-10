const db = require('../../config/database');
const recipeRepo = require('./recipe.repo');

const saveRecipe = async (data) => {
    const { product_id, ingredients } = data; 

    if (!product_id || !Array.isArray(ingredients)) {
        throw new Error('Invalid data structure');
    }

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1. ล้างสูตรส่วนผสมเดิม
        await recipeRepo.deleteRecipeByProductId(conn, product_id);

        // 2. วนลูปบันทึกสูตรส่วนผสมชุดใหม่
        for (const item of ingredients) {
            if (!item.ingredient_id || !item.quantity_used) {
                throw new Error('Missing ingredient_id or quantity_used in recipe list');
            }
            await recipeRepo.insertRecipeItem(conn, product_id, item);
        }

        // 3. บังคับตั้งค่าสินค้าตัวนี้ให้เปลี่ยนประเภทเป็นสินค้ากลุ่มน้ำชง/สั่งทำทันที
        await conn.query(
            "UPDATE Product SET Product_type = 'made_to_order' WHERE Product_id = ?",
            [product_id]
        );

        await conn.commit();
        return { message: 'Save recipe success' };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const getRecipe = async (productId) => {
    return await recipeRepo.getRecipeByProductId(productId);
};

module.exports = { saveRecipe , getRecipe };