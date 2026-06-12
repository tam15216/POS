const db = require('../../config/database');
const optionRepo = require('./option.repo');

const createOption = async (data) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const optionId = await optionRepo.insertOption(conn, data.Option_name, data.Price);
        await conn.commit();
        return { message: "Option created successfully", optionId };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const getAllIngredients = async () => {
    const conn = await db.getConnection();
    try {
        return await optionRepo.getIngredients(conn);
    } finally {
        conn.release();
    }
};

const updateOptionMapping = async (optionId, ingredients) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        await optionRepo.deleteOptionIngredients(conn, optionId);
        
        for (const ing of ingredients) {
            await optionRepo.insertOptionIngredient(conn, optionId, ing.ingredient_id, ing.quantity_used);
        }
        await conn.commit();
        return { message: "Option ingredients mapped successfully" };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const getOptionRecipe = async (optionId) => {
    const conn = await db.getConnection();
    try {
        return await optionRepo.getIngredientsByOptionId(conn, optionId);
    } finally {
        conn.release();
    }
};


const updateOption = async (optionId, data) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        await optionRepo.updateOption(conn, optionId, data.Option_name, data.Price);
        await conn.commit();
        return { message: "Option updated successfully" };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const updateOptionStatus = async (optionId, isActive) => {
    const conn = await db.getConnection();
    try {
        // 💡 มั่นใจว่าส่ง isActive ที่เป็นค่านักเลข (0 หรือ 1) ไม่ใช่ Object { Is_active: 1 }
        return await optionRepo.updateOptionStatus(conn, optionId, isActive);
    } finally {
        conn.release();
    }
};

const getActiveOptions = async () => {
    const conn = await db.getConnection();
    try {
        return await optionRepo.getActiveOptions(conn);
    } finally {
        conn.release();
    }
};

module.exports = {
    createOption,
    getAllIngredients,
    updateOptionMapping,
    getOptionRecipe,
    updateOptionStatus,
    updateOption,
    getActiveOptions
};