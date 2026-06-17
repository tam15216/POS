const db = require("../../config/database");

const insertIngredient = async (data) => {
  const [result] = await db.query(
    `INSERT INTO ingredient (Ingredient_name, Stock_qty, Unit, Minimum_qty, Buy_price, Cost_per_unit) 
         VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.Ingredient_name,
      data.Stock_qty,
      data.Unit,
      data.Minimum_qty,
      data.Buy_price,
      data.Cost_per_unit,
    ],
  );
  return { Ingredient_id: result.insertId, ...data, Is_active: 1 };
};

const getAllIngredients = async (isActive = null) => {
  let query = "SELECT * FROM ingredient";
  const params = [];

  if (isActive !== null) {
    query += " WHERE Is_active = ?";
    params.push(isActive);
  }

  query += " ORDER BY Ingredient_id DESC";

  const [rows] = await db.query(query, params);
  return rows;
};

const updateIngredient = async (id, data) => {
  await db.query(
    `UPDATE ingredient 
         SET Ingredient_name = ?, Unit = ?, Minimum_qty = ?
         WHERE Ingredient_id = ?`,
    [data.Ingredient_name, data.Unit, data.Minimum_qty, id],
  );
  return { Ingredient_id: id, ...data };
};

const updateIngredientStatus = async (id, statusValue) => {
  await db.query(
    `UPDATE ingredient 
     SET Is_active = ? 
     WHERE Ingredient_id = ?`,
    [statusValue, id],
  );
  return { Ingredient_id: id, Is_active: statusValue };
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
    [qtyChange, id],
  );
};

const insertIngredientStockLog = async (
  conn,
  id,
  action_type,
  ref_id,
  qtyChange,
) => {
  const finalRefId =
    ref_id !== undefined && ref_id !== null && ref_id !== "" ? ref_id : null;

  await conn.query(
    `INSERT INTO ingredient_stock_log (Ingredient_id, Ref_type, Ref_id, Qty_change, Log_datetime)
         VALUES (?, ?, ?, ?, NOW())`,
    [id, action_type, finalRefId, qtyChange],
  );
};

const getIngredientByIdForUpdate = async (conn, id) => {
  const [rows] = await conn.query(
    "SELECT Stock_qty, Cost_per_unit FROM ingredient WHERE Ingredient_id = ? FOR UPDATE",
    [id],
  );
  return rows[0];
};

const updateRestockData = async (conn, id, data) => {
  await conn.query(
    `UPDATE ingredient 
     SET Stock_qty = Stock_qty + ?, 
         Buy_price = ?, 
         Cost_per_unit = ? 
     WHERE Ingredient_id = ?`,
    [data.qtyReceived, data.newBuyPrice, data.newCostPerUnit, id],
  );
};

const insertIngredientStockLogWithConn = async (conn, data) => {
  await conn.query(
    `INSERT INTO ingredient_stock_log (Ingredient_id, Ref_type, Ref_id, Qty_change, Log_datetime)
     VALUES (?, ?, ?, ?, NOW())`,
    [data.id, data.action_type, data.finalRefId, data.qtyReceived],
  );
};

module.exports = {
  insertIngredient,
  getAllIngredients,
  updateIngredient,
  updateIngredientStatus,
  getStockHistory,
  updateIngredientStockOnly,
  insertIngredientStockLog,
  getIngredientByIdForUpdate,
  updateRestockData,
  insertIngredientStockLogWithConn,
};
