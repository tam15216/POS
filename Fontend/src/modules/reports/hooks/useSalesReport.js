// src/modules/dashboard/hooks/useSalesReport.js
import { useState, useEffect } from 'react';
import { getSalesReportApi } from '../../reports/api/report.api';

export default function useSalesReport() {
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultStart = new Date();
    defaultStart.setDate(defaultStart.getDate() - 30);
    const thirtyDaysAgoStr = defaultStart.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(thirtyDaysAgoStr);
    const [endDate, setEndDate] = useState(todayStr);
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getSalesReportApi(startDate, endDate);
            setReportData(res.data);
        } catch (err) {
            console.error("Error fetching sales report:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReport();
    }, [startDate, endDate]);

    return {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        reportData,
        loading,
        error,
        refresh: loadReport
    };
}