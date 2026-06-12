// ingredient.service.js
const ingredientRepo = require("./ingredient.repo");
const db = require("../../config/database");

const createIngredient = async (data) => {
  const {
    Ingredient_name,
    Stock_qty,
    Unit,
    Minimum_qty,
    Buy_price,
    Cost_per_unit,
  } = data;

  if (!Ingredient_name || !Unit) {
    throw new Error("Missing required fields: Ingredient_name or Unit");
  }

  return await ingredientRepo.insertIngredient({
    Ingredient_name,
    Stock_qty: Stock_qty || 0,
    Unit,
    Minimum_qty: Minimum_qty || 0,
    Buy_price: Buy_price || 0,
    Cost_per_unit: Cost_per_unit || 0,
  });
};

const getIngredients = async () => {
  return await ingredientRepo.getAllIngredients();
};

const updateIngredient = async (id, data) => {
  const { Ingredient_name, Unit, Minimum_qty, Buy_price, Cost_per_unit } = data;

  if (!id) {
    throw new Error("Ingredient ID is required");
  }
  if (!Ingredient_name || !Unit) {
    throw new Error("Missing required fields: Ingredient_name or Unit");
  }

  // 💡 ส่งไปให้ Repo ทำการ UPDATE ข้อมูลชุดใหม่
  return await ingredientRepo.updateIngredient(id, {
    Ingredient_name,
    Unit,
    Minimum_qty: Minimum_qty || 0,
    Buy_price: Buy_price || 0,
    Cost_per_unit: Cost_per_unit || 0,
  });
};

const deleteIngredient = async (id) => {
  if (!id) {
    throw new Error("Ingredient ID is required");
  }
  return await ingredientRepo.deleteIngredient(id);
};

const getStockHistory = async () => {
  return await ingredientRepo.getStockHistory();
};

const updateStockQuantity = async (id, data) => {
  const { action_type, quantity, ref_id } = data;

  if (!id) throw new Error("Ingredient ID is required");
  if (!action_type || !quantity)
    throw new Error("Missing action_type or quantity");

  const ingredientId = parseInt(id, 10);
  const qty = Number(quantity);
  if (isNaN(qty) || qty <= 0)
    throw new Error("Quantity must be a positive number");

  const qtyChange = action_type === "restock" ? qty : -qty;

  const finalRefId =
    ref_id !== undefined && ref_id !== null && ref_id !== ""
      ? parseInt(ref_id, 10)
      : null;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await ingredientRepo.updateIngredientStockOnly(
      conn,
      ingredientId,
      qtyChange,
    );

    await ingredientRepo.insertIngredientStockLog(
      conn,
      ingredientId,
      action_type,
      finalRefId,
      qtyChange,
    );

    await conn.commit();
    return { success: true, message: "Stock updated and logged successfully" };
  } catch (err) {
    if (conn) await conn.rollback();
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  createIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
  getStockHistory,
  updateStockQuantity,
};
