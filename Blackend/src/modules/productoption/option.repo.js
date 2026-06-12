const db = require("../../config/database");

const getAllOptions = async (conn) => {
    const [rows] = await conn.query(
        'SELECT Option_id, Option_name, Price, Is_active FROM product_option'
    );
    return rows;
};

const insertOption = async (conn, optionName, price) => {
  const [result] = await conn.query(
    "INSERT INTO product_option (Option_name, Price) VALUES (?, ?)",
    [optionName, price],
  );
  return result.insertId;
};

const insertOptionIngredient = async (conn, optionId, ingredientId, qty) => {
  await conn.query(
    "INSERT INTO option_ingredient (Option_id, Ingredient_id, Quantity_used) VALUES (?, ?, ?)",
    [optionId, ingredientId, qty],
  );
};

const deleteOptionIngredients = async (conn, optionId) => {
  await conn.query("DELETE FROM option_ingredient WHERE Option_id = ?", [
    optionId,
  ]);
};

const getIngredients = async (conn) => {
  const [rows] = await conn.query(
    "SELECT Ingredient_id, Ingredient_name FROM ingredient",
  );
  return rows;
};

const getIngredientsByOptionId = async (conn, optionId) => {
    const [rows] = await conn.query(
        `SELECT Ingredient_id AS ingredient_id, Quantity_used AS quantity_used 
         FROM option_ingredient 
         WHERE Option_id = ?`,
        [optionId]
    );
    return rows;
};

const updateOption = async (conn, optionId, optionName, price) => {
  await conn.query(
    "UPDATE product_option SET Option_name = ?, Price = ? WHERE Option_id = ?",
    [optionName, price, optionId]
  );
};

const updateOptionStatus = async (conn, optionId, isActive) => {
    await conn.query(
        'UPDATE product_option SET Is_active = ? WHERE Option_id = ?',
        [isActive, optionId]
    );
};

const getActiveOptions = async (conn) => {
    const [rows] = await conn.query(
        'SELECT Option_id, Option_name, Price, Is_active FROM product_option WHERE Is_active = 1'
    );
    return rows;
};


module.exports = {
  getAllOptions,
  insertOption,
  insertOptionIngredient,
  deleteOptionIngredients,
  getIngredients,
  getIngredientsByOptionId,
  updateOptionStatus,
  updateOption,
  getActiveOptions
};
