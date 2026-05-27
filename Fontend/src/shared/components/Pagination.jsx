export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {

    return (
        <div className="flex items-center justify-center gap-2 mt-4">

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="px-3 py-1 border rounded"
            >
                ก่อนหน้า
            </button>

            <span>
                หน้า {currentPage} จาก {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="px-3 py-1 border rounded"
            >
                ถัดไป
            </button>
        </div>
    );
}