import { useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPageItems = <T>(items: T[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSetCurrentPage = (page: number) => {
    setTimeout(() => scrollToTop(), 0);
    setCurrentPage(page);
  };

  const handlePageChange = (page: number) => {
    handleSetCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handleSetCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handleSetCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    totalPages,
    getCurrentPageItems,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  };
}
