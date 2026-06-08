import api from '../../../shared/api/axios';
export const getSalesReportApi = (startDate, endDate) => {
    return api.get('/reports/sales', {
        params: { startDate, endDate }
    });
};
export const getTopProductsReportApi = (startDate, endDate) => {
    return api.get('/reports/top-products', { params: { startDate, endDate } });
};

export const getStockMovementReportApi = (startDate, endDate) => {
    return api.get('/reports/stock-movement', { params: { startDate, endDate } });
};