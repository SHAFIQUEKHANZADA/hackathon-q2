import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 3; // Number of visible page numbers

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div className="flex sm:gap-4 gap-2 justify-center my-14">
      <button
        onClick={handlePrevious}
        className={`md:w-[98px] w-[55px] md:h-[60px] h-[45px] rounded-[10px] flex justify-center items-center text-[12px] sm:text-[16px] ${
          currentPage === 1 ? "bg-[#F9F1E7] text-gray-400" : "bg-[#F9F1E7] hover:bg-gray-200 text-black"
        }`}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] flex justify-center items-center text-[12px] sm:text-[16px] ${
            currentPage === page ? "bg-[#B88E2F] text-white" : "bg-[#F9F1E7] text-black hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        className={`md:w-[98px] w-[55px] md:h-[60px] h-[45px] rounded-[10px] flex justify-center items-center text-[12px] sm:text-[16px] ${
          currentPage === totalPages ? "bg-[#F9F1E7] text-gray-400" : "bg-[#F9F1E7] hover:bg-gray-200 text-black"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
