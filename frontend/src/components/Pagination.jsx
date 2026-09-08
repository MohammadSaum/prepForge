function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    return (
        <div className="
            flex
            items-center
            justify-center
            gap-5
            mt-10
        ">

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="
                    border border-[#24272B]
                    rounded-lg
                    px-4 py-2
                    text-sm
                    text-[#A1A3A8]
                    transition-colors duration-200
                    hover:border-[#41444A]
                    hover:text-[#F2F2F2]
                    disabled:opacity-30
                    disabled:hover:border-[#24272B]
                    disabled:hover:text-[#A1A3A8]
                "
            >
                ← Previous
            </button>

            <span className="text-sm text-[#686A70]">
                {currentPage + 1}
                <span className="mx-2 text-[#3F4247]">
                    /
                </span>
                {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="
                    border border-[#24272B]
                    rounded-lg
                    px-4 py-2
                    text-sm
                    text-[#A1A3A8]
                    transition-colors duration-200
                    hover:border-[#41444A]
                    hover:text-[#F2F2F2]
                    disabled:opacity-30
                    disabled:hover:border-[#24272B]
                    disabled:hover:text-[#A1A3A8]
                "
            >
                Next →
            </button>

        </div>
    );
}

export default Pagination;