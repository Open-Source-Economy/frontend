import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function Pagination({ currentPage, totalPages, onPageChange, onPreviousPage, onNextPage }: PaginationProps) {
  return (
    <div className="flex flex-wrap justify-center max-sm:gap-2 sm:gap-4 items-center text-white mt-4 sm:mt-8 font-semibold">
      <button
        className={`flex items-center bg-transparent border-none ${
          currentPage === 1 ? "text-white/30 cursor-not-allowed" : "text-white/70 hover:text-white cursor-pointer"
        } text-sm sm:text-base transition-colors`}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="mx-1 sm:mx-2" size={16} /> <span className="hidden xs:inline">Previous</span>
      </button>
      <div className="flex flex-wrap items-center max-sm:gap-1 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`flex justify-center items-center w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border-2 ${
              currentPage === page ? "border-theme-pink" : "border-transparent"
            } hover:border-theme-pink hover:shadow-[0px_0px_50px_rgba(255,81,140,0.75)] text-white cursor-pointer text-sm sm:text-base transition-all`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`flex items-center bg-transparent border-none ${
          currentPage === totalPages ? "text-white/30 cursor-not-allowed" : "text-white/70 hover:text-white cursor-pointer"
        } text-sm sm:text-base transition-colors`}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        <span className="hidden xs:inline">Next</span> <ChevronRight className="mx-1 sm:mx-2" size={16} />
      </button>
    </div>
  );
}
