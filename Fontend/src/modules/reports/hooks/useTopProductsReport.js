import { useState, useEffect } from 'react';
import { getTopProductsReportApi } from '../../reports/api/report.api';

export default function useTopProductsReport() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getTopProductsReportApi(startDate, endDate);
      setRecords(res.data.records);
    } catch (err) {
      console.error("Error loading top products report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [startDate, endDate]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    records,
    loading,
    refresh: loadData
  };
}