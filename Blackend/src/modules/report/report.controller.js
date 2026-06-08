const reportService = require('../report/report.service');

const getDashboard = async (req, res) => {
    try {
        const dashboardData = await reportService.getDashboardSummary();
        return res.status(200).json(dashboardData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSalesReport = async (req, res) => {
    try {
        const reportData = await reportService.getSalesReport(req.query);
        return res.status(200).json(reportData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getTopProductsReport = async (req, res) => {
    try {
        const data = await reportService.getTopProductsReport(req.query);
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getStockMovementReport = async (req, res) => {
    try {
        const data = await reportService.getStockMovementReport(req.query);
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getDashboard,
    getSalesReport,
    getTopProductsReport,
    getStockMovementReport
};