import React, { useState } from "react";
import type { Purchase } from "../types";
import { InvoiceIcon } from "src/Utils/Icons";
import { parse } from "date-fns";

interface PurchaseTableProps {
  purchases: Purchase[];
  selectedPurchaseId: number | null;
  onPurchaseClick: (id: number) => void;
  isLoading: boolean; // Add isLoading prop
}

type SortDirection = "asc" | "desc" | null;
type SortableColumn = "date" | "serviceCredit" | "price" | "plan" | null;

interface TableHeaderProps {
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  onSort: (column: SortableColumn) => void;
}

const TableHeader = ({ sortColumn, sortDirection, onSort }: TableHeaderProps) => (
  <thead>
    <tr className="">
      {[
        { label: "Date", column: "date" as SortableColumn, sortable: true },
        { label: "Service Credit", column: "serviceCredit" as SortableColumn, sortable: true },
        { label: "Price", column: "price" as SortableColumn, sortable: true },
        { label: "Plan", column: "plan" as SortableColumn, sortable: true },
        { label: "Invoice", column: null as SortableColumn, sortable: false },
      ].map(({ label, column, sortable }, index) => (
        <th
          key={label}
          className={`p-[24px] font-normal text-lg relative ${sortColumn === column ? "opacity-100" : "opacity-60"} border-b border-white/10 ${
            index === 4 ? "text-right" : index === 0 ? "text-left" : "text-center"
          } ${sortable ? "cursor-pointer hover:opacity-100" : ""}`}
          onClick={() => sortable && onSort(column)}
        >
          {label} {sortable && <span className="absolute ml-1 text-lg">{sortColumn === column ? (sortDirection === "asc" ? "↑" : "↓") : ""}</span>}
        </th>
      ))}
    </tr>
  </thead>
);

const getCommonCellClasses = (isLast: boolean, isFirst: boolean) =>
  `transition-all font-semibold p-[24px] ${!isLast ? "border-b-[0.5px] border-white/10" : ""}`;

// Skeleton component for table row
const SkeletonTableRow = ({ isLast }: { isLast: boolean }) => {
  const cellClasses = getCommonCellClasses(isLast, false);
  return (
    <tr className="animate-pulse">
      {[...Array(4)].map((_, index) => (
        <td key={index} className={cellClasses + " " + (index === 0 ? "text-left" : "text-center")}>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        </td>
      ))}
      <td className={cellClasses + ""}>
        <div className="flex w-full justify-end items-center">
          <div className="h-6 w-6 bg-gray-600 rounded"></div>
        </div>
      </td>
    </tr>
  );
};

// Skeleton component for mobile card
const SkeletonMobileCard = () => (
  <div className="block p-4 rounded-xl bg-theme-blue border border-white/10 animate-pulse">
    <div className="grid grid-cols-2 gap-2 text-white">
      {[...Array(4)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="text-white/60 h-4 bg-gray-600 rounded w-1/2"></div>
          <div className="font-semibold h-4 bg-gray-600 rounded w-3/4"></div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const TableRow = ({
  purchase,
  isSelected,
  onClick,
  isLast,
  isFirst,
}: {
  purchase: Purchase;
  isSelected: boolean;
  onClick: () => void;
  isLast: boolean;
  isFirst: boolean;
}) => {
  const cellClasses = getCommonCellClasses(isLast, isFirst);

  return (
    <tr
      key={purchase.id}
      className="transition-all outline outline-2 outline-transparent hover:outline-theme-pink rounded-[15px] hover:bg-theme-blue hover:shadow-[0px_0px_50px_rgba(255,81,140,0.43)]"
      onClick={onClick}
    >
      {[purchase.date, purchase.serviceCredit, purchase.price, purchase.plan].map((value, index) => (
        <td key={index} className={cellClasses + " " + (index === 0 ? "text-left" : "text-center")}>
          {value}
        </td>
      ))}
      <td className={cellClasses + ""}>
        <div className="flex w-full justify-end items-center">
          <a href="#">
            <InvoiceIcon />
          </a>
        </div>
      </td>
    </tr>
  );
};

export function PurchaseTable({ purchases, selectedPurchaseId, onPurchaseClick, isLoading }: PurchaseTableProps) {
  // Show loading state whenever isLoading is true
  const [isMobileView, setIsMobileView] = useState(false);

  // Check if screen is mobile size on mount and when window resizes
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  const [sortColumn, setSortColumn] = useState<SortableColumn>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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

  // Sort purchases based on current sort column and direction
  const sortedPurchases = [...purchases].sort((a, b) => {
    if (sortColumn === null) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      // For date strings, use date-fns for robust parsing
      if (sortColumn === "date") {
        // Attempt to parse the date string using the format 'dd/MM/yyyy' based on mock data.
        const aDate = parse(aValue, "dd/MM/yyyy", new Date());
        const bDate = parse(bValue, "dd/MM/yyyy", new Date());

        // Check if dates are valid after parsing
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return sortDirection === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
        } else {
          // Fallback to string comparison if parsing fails
          console.warn("Failed to parse date strings for sorting, falling back to string comparison:", aValue, bValue);
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
      }

      // For serviceCredit strings, try to extract numeric values
      if (sortColumn === "serviceCredit") {
        const aNum = parseInt(aValue.replace(/[^0-9]+/g, ""), 10);
        const bNum = parseInt(bValue.replace(/[^0-9]+/g, ""), 10);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        }
      }

      // For price strings, try to extract numeric values
      if (sortColumn === "price") {
        const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
        const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        }
      }

      // Default string comparison
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return 0;
  });
  return (
    <div className="bg-theme-blue rounded-[25px] overflow-hidden mb-8 max-md:p-3 md:px-10 md:pt-[10px] md:pb-[28px]">
      {isLoading ? (
        // Show loading state for both desktop and mobile
        !isMobileView ? (
          // Desktop skeleton
          <table className="w-full border-collapse text-white max-md:hidden md:table">
            <TableHeader sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
            <tbody>
              {[...Array(5)].map((_, i) => (
                <SkeletonTableRow key={i} isLast={i === 4} />
              ))}
            </tbody>
          </table>
        ) : (
          // Mobile skeleton
          <div className="md:hidden grid gap-4">
            {[...Array(5)].map((_, i) => (
              <SkeletonMobileCard key={i} />
            ))}
          </div>
        )
      ) : // Show actual data when not loading
      !isMobileView ? (
        // Desktop view - standard table
        <table className="w-full border-collapse text-white max-md:hidden md:table">
          <TableHeader sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
          <tbody>
            {sortedPurchases.map((purchase, i) => (
              <TableRow
                key={purchase.id}
                isLast={i === purchases.length - 1}
                isFirst={i === 0}
                purchase={purchase}
                isSelected={selectedPurchaseId === purchase.id}
                onClick={() => onPurchaseClick(purchase.id)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        // Mobile view - card style layout
        <div className="md:hidden grid gap-4">
          {sortedPurchases.map((purchase, i) => (
            <a
              href="#"
              key={purchase.id}
              className={`block p-4 rounded-xl transition-all outline outline-2 outline-transparent hover:outline-theme-pink bg-theme-blue hover:shadow-[0px_0px_50px_rgba(255,81,140,0.43)] border border-white/10 hover:border-white/0`}
              onClick={e => {
                e.preventDefault(); // Prevent default anchor behavior (scrolling)
                onPurchaseClick(purchase.id);
              }}
            >
              <div className="grid grid-cols-2 gap-2 text-white">
                <div className="text-white/60">Date:</div>
                <div className="font-semibold">{purchase.date}</div>

                <div className="text-white/60">Service Credit:</div>
                <div className="font-semibold">{purchase.serviceCredit}</div>

                <div className="text-white/60">Price:</div>
                <div className="font-semibold">{purchase.price}</div>

                <div className="text-white/60">Plan:</div>
                <div className="font-semibold">{purchase.plan}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
