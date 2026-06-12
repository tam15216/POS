// usePagination.js
import { useState, useEffect } from "react";

export const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [data.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  };
};
