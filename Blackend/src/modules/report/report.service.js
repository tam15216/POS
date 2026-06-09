const reportRepo = require("../report/report.repo");

const getDashboardSummary = async () => {
  const [
    todayData,
    monthSales,
    totalProducts,
    totalCategories,
    lowStockItems,
    topSelling,
  ] = await Promise.all([
    reportRepo.getTodaySalesAndOrders(),
    reportRepo.getMonthSales(),
    reportRepo.getTotalProducts(),
    reportRepo.getTotalCategories(),
    reportRepo.getLowStockProducts(10),
    reportRepo.getTopSellingProducts(5),
  ]);

  return {
    today_sales: Number(todayData.today_sales),
    month_sales: Number(monthSales),
    today_orders: Number(todayData.today_orders),
    total_products: Number(totalProducts),
    total_categories: Number(totalCategories),
    low_stock: lowStockItems.length,
    low_stock_items: lowStockItems,
    top_selling_products: topSelling,
  };
};

const getSalesReport = async (query) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayStr = new Date(
    firstDay.getTime() - firstDay.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const lastDayStr = new Date(
    lastDay.getTime() - lastDay.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const startDate = query.startDate || firstDayStr;
  const endDate = query.endDate || lastDayStr;

  const salesData = await reportRepo.getSalesByPeriod(startDate, endDate);

  let totalSalesVolume = 0;
  let totalNetAmount = 0;
  let totalDiscount = 0;

  salesData.forEach((item) => {
    if (item.Status === "paid") {
      totalSalesVolume += 1;
      totalNetAmount += Number(item.Net_amount);
      totalDiscount += Number(item.Discount_amount);
    }
  });

  return {
    summary: {
      startDate,
      endDate,
      total_orders: totalSalesVolume,
      total_sales_amount: totalNetAmount,
      total_discount_amount: totalDiscount,
    },
    records: salesData,
  };
};

const getTopProductsReport = async (query) => {
  const today = new Date().toISOString().split("T")[0];
  const startDate = query.startDate || today;
  const endDate = query.endDate || today;

  const records = await reportRepo.getTopProductsReport(startDate, endDate);
  return { summary: { startDate, endDate }, records };
};

const getStockMovementReport = async (query) => {
  const today = new Date().toISOString().split("T")[0];
  const startDate = query.startDate || today;
  const endDate = query.endDate || today;

  const records = await reportRepo.getStockMovementReport(startDate, endDate);
  return { summary: { startDate, endDate }, records };
};

module.exports = {
  getDashboardSummary,
  getSalesReport,
  getTopProductsReport,
  getStockMovementReport,
};
