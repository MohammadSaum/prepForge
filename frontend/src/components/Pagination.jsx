function Pagination({
    currentPage, 
    totalPages,
    onPageChange
}) {
    return (
        <div className="flex items-center justify-center gap-4 mt-8">

            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="border rounded-lg px-4 py-2 disabled:opacity-50">
                Previous
            </button>

            <span>
                Page {currentPage + 1} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="border rounded-lg px-4 py-2 disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>

        </div>
    );
}

export default Pagination; 