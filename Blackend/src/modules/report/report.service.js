const reportRepo = require("../report/report.repo");

const getDashboardSummary = async () => {
  const [
    todayData,
    monthSales,
    totalProducts,
    totalCategories,
    lowStockItems,
    topSelling,
    monthProfitData,
  ] = await Promise.all([
    reportRepo.getTodaySalesAndOrders(),
    reportRepo.getMonthSales(),
    reportRepo.getTotalProducts(),
    reportRepo.getTotalCategories(),
    reportRepo.getLowStockProducts(10),
    reportRepo.getTopSellingProducts(5),
    reportRepo.getMonthProfitReport(),
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
    month_profit: Number(monthProfitData?.net_profit || 0),
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
  let totalProfitAmount = 0;
  const records = Array.isArray(salesData) ? salesData : [];

  records.forEach((item) => {
    const status = item.status || item.Status;

    if (status === "paid") {
      const netAmount = Number(
        item.net_amount !== undefined ? item.net_amount : item.Net_amount || 0,
      );
      const totalCost = Number(
        item.bill_total_cost !== undefined
          ? item.bill_total_cost
          : item.Bill_total_cost || 0,
      );

      totalSalesVolume += 1;
      totalNetAmount += netAmount;
      totalProfitAmount += (netAmount - totalCost);
    }
  });

  return {
    summary: {
      startDate,
      endDate,
      total_orders: totalSalesVolume,
      total_sales_amount: totalNetAmount,
      total_profit_amount: totalProfitAmount,
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
