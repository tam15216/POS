const db = require("../../config/database");

const getTodaySalesAndOrders = async () => {
  const [rows] = await db.query(
    `SELECT 
            COALESCE(SUM(Net_amount), 0) AS today_sales,
            COUNT(Sale_id) AS today_orders
         FROM sale 
         WHERE Status = 'paid' AND DATE(Sale_datetime) = CURDATE()`,
  );
  return rows[0];
};

const getMonthProfitReport = async () => {
  const [rows] = await db.query(
    `SELECT 
        COALESCE(SUM(si.Unit_price * si.Qty), 0) AS total_sales,
        
        COALESCE(SUM(p.Cost_price * si.Qty), 0) AS total_cost,
        
        COALESCE(SUM(s.Discount_amount), 0) AS total_discount,
        
        (COALESCE(SUM(si.Unit_price * si.Qty), 0) - COALESCE(SUM(p.Cost_price * si.Qty), 0) - COALESCE(SUM(s.Discount_amount), 0)) AS net_profit
        
     FROM sale s
     INNER JOIN sale_item si ON s.Sale_id = si.Sale_id
     INNER JOIN product p ON si.Product_id = p.Product_id
     WHERE s.Status = 'paid'
       AND YEAR(s.Sale_datetime) = YEAR(CURDATE())
       AND MONTH(s.Sale_datetime) = MONTH(CURDATE())`,
  );

  return rows[0];
};

const getMonthSales = async () => {
  const [rows] = await db.query(
    `SELECT 
            COALESCE(SUM(Net_amount), 0) AS month_sales
         FROM sale 
         WHERE Status = 'paid' 
         AND YEAR(Sale_datetime) = YEAR(CURDATE()) 
         AND MONTH(Sale_datetime) = MONTH(CURDATE())`,
  );
  return rows[0].month_sales;
};

const getTotalProducts = async () => {
  const [rows] = await db.query(
    `SELECT COUNT(Product_id) AS total_products FROM product WHERE status = 1`,
  );
  return rows[0].total_products;
};

const getTotalCategories = async () => {
  const [rows] = await db.query(
    `SELECT COUNT(Category_id) AS total_categories FROM category WHERE Status = 1`,
  );
  return rows[0].total_categories;
};

const getLowStockProducts = async (productLimit = 10) => {
  const [rows] = await db.query(
    `
        SELECT 
            'product' AS item_type,
            p.Product_id AS item_id,
            p.Product_name AS item_name,
            p.Product_code AS item_code,
            s.Qty AS current_qty,
            ? AS min_qty,
            'ชิ้น' AS unit
        FROM stock s
        INNER JOIN product p ON s.Product_id = p.Product_id
        WHERE s.Qty <= ? AND p.status = 1

        UNION ALL

        SELECT 
            'ingredient' AS item_type,
            i.Ingredient_id AS item_id,
            i.Ingredient_name AS item_name,
            '-' AS item_code,
            i.Stock_qty AS current_qty,
            i.Minimum_qty AS min_qty,
            i.Unit AS unit
        FROM ingredient i
        WHERE i.Stock_qty <= i.Minimum_qty
        `,
    [productLimit, productLimit],
  );
  return rows;
};

const getTopSellingProducts = async (limit = 5) => {
  const [rows] = await db.query(
    `SELECT 
            p.Product_id,
            p.Product_name,
            p.Product_code,
            p.Product_price,
            SUM(si.Qty) AS total_qty_sold,
            SUM(si.Total_price) AS total_revenue
         FROM sale_item si
         INNER JOIN product p ON si.Product_id = p.Product_id
         INNER JOIN sale s ON si.Sale_id = s.Sale_id
         WHERE s.Status = 'paid'
           AND YEAR(s.Sale_datetime) = YEAR(CURDATE())
           AND MONTH(s.Sale_datetime) = MONTH(CURDATE())
         GROUP BY p.Product_id
         ORDER BY total_qty_sold DESC
         LIMIT ?`,
    [limit],
  );
  return rows;
};

const getSalesByPeriod = async (startDate, endDate) => {
  const [rows] = await db.query(
    `SELECT 
        s.Sale_id,
        s.Bill_no,
        s.Sale_datetime,
        s.Total_amount,
        s.Discount_amount,
        s.Net_amount,
        s.Status,
        p.Payment_method,
        u.Full_name AS seller_name,
        COALESCE((
          SELECT SUM(p.Cost_price * si.Qty) 
          FROM sale_item si
          INNER JOIN product p ON si.Product_id = p.Product_id
          WHERE si.Sale_id = s.Sale_id
        ), 0) AS bill_total_cost
     FROM sale s
     LEFT JOIN payment p ON s.Sale_id = p.Sale_id
     LEFT JOIN user u ON s.Created_by = u.User_id 
     WHERE DATE(s.Sale_datetime) BETWEEN ? AND ?
     ORDER BY s.Sale_datetime DESC`,
    [startDate, endDate],
  );
  return rows;
};

const getTopProductsReport = async (startDate, endDate) => {
  const [rows] = await db.query(
    `SELECT 
            p.Product_id,
            p.Product_code,
            p.Product_name,
            c.Category_name,
            p.Product_price,
            SUM(si.Qty) AS total_qty_sold,
            SUM(si.Total_price) AS total_revenue
         FROM sale_item si
         INNER JOIN product p ON si.Product_id = p.Product_id
         LEFT JOIN category c ON p.Category_id = c.Category_id
         INNER JOIN sale s ON si.Sale_id = s.Sale_id
         WHERE s.Status = 'paid'
           AND DATE(s.Sale_datetime) BETWEEN ? AND ?
         GROUP BY p.Product_id
         ORDER BY total_qty_sold DESC`,
    [startDate, endDate],
  );
  return rows;
};

const getStockMovementReport = async (startDate, endDate) => {
  const [rows] = await db.query(
    `
    SELECT 
        sl.Stock_log_id AS log_id,
        sl.Created_at AS created_at,
        'product' AS item_type,
        p.Product_id AS item_id,
        p.Product_code AS item_code,
        p.Product_name AS item_name,
        sl.Ref_type AS ref_type,
        sl.Qty_change AS qty_change,
        sl.Ref_id AS ref_id,
        s.Bill_no AS bill_no,
        'ชิ้น' AS unit
     FROM stock_log sl
     INNER JOIN product p ON sl.Product_id = p.Product_id
     LEFT JOIN sale s ON sl.Ref_id = s.Sale_id 
     WHERE DATE(sl.Created_at) BETWEEN ? AND ?

     UNION ALL

      SELECT 
          il.Log_id AS log_id,
          il.Log_datetime AS created_at,
          'ingredient' AS item_type,
          i.Ingredient_id AS item_id,
          '-' AS item_code,
          i.Ingredient_name AS item_name,
          il.Ref_type AS ref_type,
          il.Qty_change AS qty_change,
          il.Ref_id AS ref_id,
          s.Bill_no AS bill_no, 
          i.Unit AS unit
      FROM ingredient_stock_log il
      INNER JOIN ingredient i ON il.Ingredient_id = i.Ingredient_id
      LEFT JOIN sale s ON il.Ref_id = s.Sale_id 
      WHERE DATE(il.Log_datetime) BETWEEN ? AND ?
     ORDER BY created_at DESC
    `,
    [startDate, endDate, startDate, endDate],
  );
  return rows;
};

module.exports = {
  getTodaySalesAndOrders,
  getMonthSales,
  getTotalProducts,
  getTotalCategories,
  getLowStockProducts,
  getTopSellingProducts,
  getSalesByPeriod,
  getTopProductsReport,
  getStockMovementReport,
  getMonthProfitReport,
};
