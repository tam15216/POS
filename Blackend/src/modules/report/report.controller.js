// src/controllers/report.controller.js
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

module.exports = {
    getDashboard
};