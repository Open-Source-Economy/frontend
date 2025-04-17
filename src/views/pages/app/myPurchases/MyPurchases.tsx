import React, { useState, useEffect } from "react";
import { PageWrapper } from "../../PageWrapper";
import { PurchaseTable, SortableColumn } from "./components/PurchaseTable";
import { Pagination } from "./components/Pagination";
import { mockPurchases } from "./data/mockPurchases";
import { usePagination } from "./hooks/usePagination";
import { parse } from "date-fns";

interface MyPurchasesProps {}

export function MyPurchases(props: MyPurchasesProps) {
  const [purchases] = useState(mockPurchases);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(5);
  const [isLoading, setIsLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<"date" | "serviceCredit" | "price" | "plan" | null>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>("desc");

  const itemsPerPage = 10;
  const { currentPage, totalPages, getCurrentPageItems, handlePageChange, handlePreviousPage, handleNextPage } = usePagination({
    totalItems: purchases.length,
    itemsPerPage,
  });

  const handlePurchaseClick = (id: number) => {
    setSelectedPurchaseId(id);
  };

  // Handle pagination with loading state
  const handlePaginationChange = (page: number) => {
    setIsLoading(true);
    handlePageChange(page);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handlePaginationPrevious = () => {
    setIsLoading(true);
    handlePreviousPage();
    setTimeout(() => setIsLoading(false), 500);
  };

  const handlePaginationNext = () => {
    setIsLoading(true);
    handleNextPage();
    setTimeout(() => setIsLoading(false), 500);
  };

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSort = (column: SortableColumn) => {
    if (column === null) return;

    if (sortColumn === column) {
      // Toggle direction if same column is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to descending
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const sortedPurchases = [...purchases].sort((a, b) => {
    if (sortColumn === null) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      if (sortColumn === "date") {
        const aDate = parse(aValue, "dd/MM/yyyy", new Date());
        const bDate = parse(bValue, "dd/MM/yyyy", new Date());

        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return sortDirection === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
        } else {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
      }

      if (sortColumn === "serviceCredit") {
        const aNum = parseInt(aValue.replace(/[^0-9]+/g, ""), 10);
        const bNum = parseInt(bValue.replace(/[^0-9]+/g, ""), 10);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        }
      }

      if (sortColumn === "price") {
        const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
        const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        }
      }

      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <PageWrapper>
      <div className="min-h-[calc(100vh-88px-547.5px)] max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-10 sm:px-8 sm:py-16 md:py-20">
        <h1 className="max-sm:text-2xl sm:text-3xl md:text-4xl font-michroma max-sm:mb-4 sm:mb-6 md:mb-12 text-white text-center">My Purchases</h1>
        <PurchaseTable
          purchases={getCurrentPageItems(sortedPurchases)}
          selectedPurchaseId={selectedPurchaseId}
          onPurchaseClick={handlePurchaseClick}
          isLoading={isLoading} // Pass loading state
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        {/* Render pagination only when not loading */}
        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePaginationChange}
            onPreviousPage={handlePaginationPrevious}
            onNextPage={handlePaginationNext}
          />
        )}
      </div>
    </PageWrapper>
  );
}
