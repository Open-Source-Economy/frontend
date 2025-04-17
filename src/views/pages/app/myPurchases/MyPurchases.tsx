import React, { useState, useEffect } from "react";
import { PageWrapper } from "../../PageWrapper";
import { PurchaseTable } from "./components/PurchaseTable";
import { Pagination } from "./components/Pagination";
import { mockPurchases } from "./data/mockPurchases";
import { usePagination } from "./hooks/usePagination";

interface MyPurchasesProps {}

export function MyPurchases(props: MyPurchasesProps) {
  const [purchases] = useState(mockPurchases);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(5);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <PageWrapper>
      <div className="min-h-[calc(100vh-88px-547.5px)] max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-10 sm:px-8 sm:py-16 md:py-20">
        <h1 className="max-sm:text-2xl sm:text-3xl md:text-4xl font-michroma max-sm:mb-4 sm:mb-6 md:mb-12 text-white text-center">My Purchases</h1>
        <PurchaseTable
          purchases={getCurrentPageItems(purchases)}
          selectedPurchaseId={selectedPurchaseId}
          onPurchaseClick={handlePurchaseClick}
          isLoading={isLoading} // Pass loading state
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
