import React from "react";

interface PriceItemsProps {}

export function PriceItems(props: PriceItemsProps) {
  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-[16px]">Subtotal:</h2>
        <h3 className="text-[16px]">10,000 $</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-[16px]">Discount</h2>
        <h3 className="text-[16px]">-10%</h3>
      </div>
      <div className="flex justify-between items-center mt-4 pt-3  border-t border-t-[#fff]">
        <h2 className="text-[16px]">
          Total <span className="text-[14px] text-[rgba(255,255,255,60%)]">(indl. Taxes)</span>
        </h2>
        <h3 className="text-[16px] text-end">
          10,000 $ <span className="text-[14px] text-[rgba(255,255,255,60%)]">/ Month</span>
        </h3>
      </div>
    </>
  );
}
