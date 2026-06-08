import {getDashboardApi} from '../api/Dashboard.api';

export const getDashboard = async () => {
    const res = await getDashboardApi();
    return res.data;
};

