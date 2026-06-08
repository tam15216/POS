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

const getLowStockProducts = async (limit = 10) => {
  const [rows] = await db.query(
    `SELECT 
            p.Product_id,
            p.Product_name,
            p.Product_code,
            s.Qty AS current_qty
         FROM stock s
         INNER JOIN product p ON s.Product_id = p.Product_id
         WHERE s.Qty <= ? AND p.status = 1`,
    [limit],
  );
  return rows; 
};

module.exports = {
  getTodaySalesAndOrders,
  getMonthSales,
  getTotalProducts,
  getTotalCategories,
  getLowStockProducts,
};
