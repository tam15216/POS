import api from '../../../shared/api/axios';
export const getSalesReportApi = (startDate, endDate) => {
    return api.get('/reports/sales', {
        params: { startDate, endDate }
    });
};
