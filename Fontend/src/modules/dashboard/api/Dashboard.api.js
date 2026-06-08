import api from '../../../shared/api/axios';

export const getDashboardApi = () => {
    return api.get('/reports/dashboard');
};