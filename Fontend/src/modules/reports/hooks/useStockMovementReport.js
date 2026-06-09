import { useState, useEffect } from "react";
import { getStockMovementReportApi } from "../../reports/api/report.api";

export default function useStockMovementReport() {
  const todayStr = new Date().toISOString().split("T")[0];
  const defaultStart = new Date();
  defaultStart.setDate(defaultStart.getDate() - 30);
  const thirtyDaysAgoStr = defaultStart.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(thirtyDaysAgoStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getStockMovementReportApi(startDate, endDate);
      setRecords(res.data.records);
    } catch (err) {
      console.error("Error loading stock log report:", err);
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
    refresh: loadData,
  };
}
