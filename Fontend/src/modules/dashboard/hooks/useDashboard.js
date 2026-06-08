import {useEffect, useState} from 'react';
import {getDashboard} from '../services/dashboard.service';

export default function useDashboard() {
    const [dashboard , setDashboard] = useState(null);

    const [ loading, setLoading] = useState(false);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        setLoading(true);
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    return { dashboard, loading, loadDashboard };
}