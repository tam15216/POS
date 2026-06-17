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

const getIngredients = async (queryFilter = {}) => {
  const { active } = queryFilter;

  let isActive = null;
  if (active !== undefined) {
    isActive = active === "1" || active === "true" ? 1 : 0;
  }

  return await ingredientRepo.getAllIngredients(isActive);
};

const updateIngredient = async (id, data) => {
  const { Ingredient_name, Unit, Minimum_qty } = data; // 💡 ถอด Buy_price และ Cost_per_unit ออก

  if (!id) throw new Error("Ingredient ID is required");
  if (!Ingredient_name || !Unit)
    throw new Error("Missing required fields: Ingredient_name or Unit");

  return await ingredientRepo.updateIngredient(id, {
    Ingredient_name,
    Unit,
    Minimum_qty: Minimum_qty || 0,
  });
};

const toggleIngredientStatus = async (id, data) => {
  const { is_active } = data;

  if (!id) throw new Error("Ingredient ID is required");
  if (is_active === undefined) throw new Error("Missing is_active status");

  const statusValue = is_active ? 1 : 0;
  return await ingredientRepo.updateIngredientStatus(id, statusValue);
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

const restockIngredient = async (id, data) => {
  const qtyReceived = Number(data.quantity_received);
  const newBuyPrice = Number(data.buy_price);

  if (isNaN(qtyReceived) || qtyReceived <= 0)
    throw new Error("Quantity must be a positive number");
  if (isNaN(newBuyPrice) || newBuyPrice < 0)
    throw new Error("Buy price must be a positive number");

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const ingredient = await ingredientRepo.getIngredientByIdForUpdate(
      conn,
      id,
    );
    if (!ingredient) throw new Error("Ingredient not found");

    const currentStock = Number(ingredient.Stock_qty);
    const currentCostPerUnit = Number(ingredient.Cost_per_unit);

    const totalStockAfter = currentStock + qtyReceived;
    let newCostPerUnit = currentCostPerUnit;

    if (totalStockAfter > 0) {
      const totalValueBefore = currentStock * currentCostPerUnit;
      newCostPerUnit = (totalValueBefore + newBuyPrice) / totalStockAfter;
    }

    await ingredientRepo.updateRestockData(conn, id, {
      qtyReceived,
      newBuyPrice,
      newCostPerUnit,
    });

    const finalRefId = data.ref_id ? parseInt(data.ref_id, 10) : null;
    await ingredientRepo.insertIngredientStockLogWithConn(conn, {
      id,
      action_type: data.action_type || "restock",
      finalRefId,
      qtyReceived,
    });

    await conn.commit();
    return {
      success: true,
      message: "Restock successfully",
      new_cost: newCostPerUnit,
    };
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
  toggleIngredientStatus,
  getStockHistory,
  updateStockQuantity,
  restockIngredient,
};
