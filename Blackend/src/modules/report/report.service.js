// src/services/report.service.js
const reportRepo = require("../report/report.repo");

const getDashboardSummary = async () => {
  const [todayData, monthSales, totalProducts, totalCategories, lowStockItems] =
    await Promise.all([
      reportRepo.getTodaySalesAndOrders(),
      reportRepo.getMonthSales(),
      reportRepo.getTotalProducts(),
      reportRepo.getTotalCategories(),
      reportRepo.getLowStockProducts(10),
    ]);

  return {
    today_sales: Number(todayData.today_sales),
    month_sales: Number(monthSales),
    today_orders: Number(todayData.today_orders),
    total_products: Number(totalProducts),
    total_categories: Number(totalCategories),
    low_stock: lowStockItems.length, 
    low_stock_items: lowStockItems  
  };
};

module.exports = {
  getDashboardSummary,
};
