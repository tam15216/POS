const db = require("../../config/database");

const checkStockForUpdate = async (conn, productId) => {
  const [rows] = await conn.query(
    "SELECT Qty FROM Stock WHERE Product_id = ? FOR UPDATE",
    [productId],
  );
  return rows;
};

const insertSale = async (conn, billNo, userId) => {
  const [result] = await conn.query(
    `INSERT INTO Sale (Bill_no, Status, Created_by) VALUES (?, 'paid', ?)`,
    [billNo, userId],
  );
  return result.insertId;
};

const getProductPrice = async (conn, productId) => {
  const [rows] = await conn.query(
    "SELECT Product_price FROM Product WHERE Product_id = ?",
    [productId],
  );
  return rows[0]?.Product_price;
};

const insertSaleItem = async (conn, saleId, item, price, totalPrice, costPerUnit) => {
  const [result] = await conn.query(
    `INSERT INTO sale_item (sale_id, product_id, qty, unit_price, total_price , cost_per_unit) VALUES (?, ?, ?, ?, ? ,?)`,
    [saleId, item.product_id, item.qty, price, totalPrice, costPerUnit],
  );
  return result.insertId;
};

const updateStockDecrease = async (conn, productId, qty) => {
  const [result] = await conn.query(
    "UPDATE Stock SET Qty = Qty - ? WHERE Product_id = ? AND Qty >= ?",
    [qty, productId, qty],
  );
  return result.affectedRows > 0;
};

const insertStockLog = async (conn, productId, refType, refId, qtyChange) => {
  await conn.query(
    `INSERT INTO Stock_log (Product_id, Ref_type, Ref_id, Qty_change) VALUES (?, ?, ?, ?)`,
    [productId, refType, refId, qtyChange],
  );
};

const updateSaleTotal = async (conn, saleId, total) => {
  await conn.query(
    `UPDATE Sale SET Total_amount = ?, Net_amount = ? WHERE Sale_id = ?`,
    [total, total, saleId],
  );
};

const insertPayment = async (conn, saleId, paymentMethod, total) => {
  await conn.query(
    `INSERT INTO Payment (Sale_id, Payment_method, Amount) VALUES (?, ?, ?)`,
    [saleId, paymentMethod, total],
  );
};

const checkSaleStatusForUpdate = async (conn, saleId) => {
  const [rows] = await conn.query(
    "SELECT Status FROM Sale WHERE Sale_id = ? FOR UPDATE",
    [saleId],
  );
  return rows;
};

const getSaleItems = async (conn, saleId) => {
  const [rows] = await conn.query(
    "SELECT Sale_item_id, Product_id, Qty FROM Sale_item WHERE Sale_id = ?",
    [saleId],
  );
  return rows;
};

const updateStockIncrease = async (conn, productId, qty) => {
  await conn.query("UPDATE Stock SET Qty = Qty + ? WHERE Product_id = ?", [
    qty,
    productId,
  ]);
};

const updateSaleStatus = async (conn, saleId, status) => {
  await conn.query(`UPDATE Sale SET Status = ? WHERE Sale_id = ?`, [
    status,
    saleId,
  ]);
};

const getOrders = async () => {
  const [rows] = await db.query(`
        SELECT 
            s.*,                 
            u.Full_name AS seller_name  
        FROM Sale s
        LEFT JOIN user u ON s.Created_by = u.User_id 
        ORDER BY s.Sale_id DESC
    `);
  return rows;
};

const getOrderById = async (saleId) => {
  const [rows] = await db.query(
    `
        SELECT *
        FROM Sale
        WHERE Sale_id = ?
    `,
    [saleId],
  );
  return rows[0];
};

const getOrderDetail = async (saleId) => {
  const [saleRows] = await db.query(
    `
        SELECT *
        FROM Sale
        WHERE Sale_id = ?
    `,
    [saleId],
  );

  if (saleRows.length === 0) return null;

  const [itemRows] = await db.query(
    `
        SELECT si.*, p.Product_name
        FROM sale_item si
        INNER JOIN product p ON si.Product_id = p.Product_id
        WHERE si.Sale_id = ?
    `,
    [saleId],
  );

  for (let item of itemRows) {
    const [optionRows] = await db.query(
      `
          SELECT sio.*, o.Option_name
          FROM sale_item_option sio
          LEFT JOIN product_option o ON sio.Option_id = o.Option_id
          WHERE sio.Sale_item_id = ?
      `,
      [item.Sale_item_id]
    );
    
    item.options = optionRows;
  }

  const [paymentRows] = await db.query(
    `
        SELECT * FROM payment 
        WHERE Sale_id = ?
    `,
    [saleId]
  );

  return {
    sale: saleRows[0],
    items: itemRows,
    payment: paymentRows[0] || null
  };
};

const getProductRecipe = async (conn, productId) => {
  const [rows] = await conn.query(
    "SELECT Ingredient_id, Quantity_used FROM product_ingredient WHERE Product_id = ?",
    [productId],
  );
  return rows;
};

const updateIngredientDecrease = async (conn, ingredientId, qty) => {
  await conn.query(
    "UPDATE ingredient SET Stock_qty = Stock_qty - ? WHERE Ingredient_id = ?",
    [qty, ingredientId],
  );
};

const updateIngredientIncrease = async (conn, ingredientId, qty) => {
  await conn.query(
    "UPDATE ingredient SET Stock_qty = Stock_qty + ? WHERE Ingredient_id = ?",
    [qty, ingredientId],
  );
};

const insertIngredientStockLog = async (
  conn,
  ingredientId,
  refType,
  refId,
  qtyChange,
  costAtSale
) => {
  await conn.query(
    `INSERT INTO ingredient_stock_log (Ingredient_id, Ref_type, Ref_id, Qty_change, Cost_at_sale) VALUES (?, ?, ?, ?, ?)`,
    [ingredientId, refType, refId, qtyChange, costAtSale],
  );
};

const checkIngredientStockForUpdate = async (conn, ingredientId) => {
  const [rows] = await conn.query(
    "SELECT Stock_qty , Cost_per_unit FROM ingredient WHERE Ingredient_id = ? FOR UPDATE",
    [ingredientId],
  );
  return rows;
};

const insertSaleItemOption = async (conn, saleItemId, option) => {
  await conn.query(
    "INSERT INTO sale_item_option (Sale_item_id, Option_id, Price) VALUES (?, ?, ?)",
    [saleItemId, option.option_id, option.price],
  );
};

const getSaleItemOptions = async (conn, saleItemId) => {
  const [rows] = await conn.query(
    "SELECT Option_id FROM sale_item_option WHERE Sale_item_id = ?",
    [saleItemId],
  );
  return rows;
};

const getOptionIngredients = async (conn, optionId) => {
    const [rows] = await conn.query(
        'SELECT Ingredient_id, Quantity_used FROM option_ingredient WHERE Option_id = ?',
        [optionId]
    );
    return rows;
};

module.exports = {
  checkStockForUpdate,
  insertSale,
  getProductPrice,
  insertSaleItem,
  updateStockDecrease,
  insertStockLog,
  updateSaleTotal,
  insertPayment,
  checkSaleStatusForUpdate,
  getSaleItems,
  updateStockIncrease,
  updateSaleStatus,
  getOrders,
  getOrderById,
  getOrderDetail,
  getProductRecipe,
  updateIngredientDecrease,
  updateIngredientIncrease,
  insertIngredientStockLog,
  checkIngredientStockForUpdate,
  insertSaleItemOption,
  getSaleItemOptions,
  getOptionIngredients
};
