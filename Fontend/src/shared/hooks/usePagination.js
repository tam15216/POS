import { useState } from 'react';

export const usePagination = (
    data,
    itemsPerPage = 10
) => {

    const [currentPage, setCurrentPage]
        = useState(1);

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const paginatedData =
        data.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    const totalPages = Math.ceil(
        data.length / itemsPerPage
    );

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedData
    };
};