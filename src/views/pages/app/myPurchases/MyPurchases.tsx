import React, { useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { PurchaseTable } from "./components/PurchaseTable";
import { Pagination } from "./components/Pagination";
import { mockPurchases } from "./data/mockPurchases";
import { usePagination } from "./hooks/usePagination";

interface MyPurchasesProps {}

export function MyPurchases(props: MyPurchasesProps) {
  const [purchases] = useState(mockPurchases);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(5);

  const itemsPerPage = 10;
  const { currentPage, totalPages, getCurrentPageItems, handlePageChange, handlePreviousPage, handleNextPage } = usePagination({
    totalItems: purchases.length,
    itemsPerPage,
  });

  const handlePurchaseClick = (id: number) => {
    setSelectedPurchaseId(id);
  };

  return (
    <PageWrapper>
      <div className="max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <h1 className="max-sm:text-2xl sm:text-3xl md:text-4xl font-michroma max-sm:mb-4 sm:mb-6 md:mb-8 text-white text-center">My Purchases</h1>
        <PurchaseTable purchases={getCurrentPageItems(purchases)} selectedPurchaseId={selectedPurchaseId} onPurchaseClick={handlePurchaseClick} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    </PageWrapper>
  );
}
