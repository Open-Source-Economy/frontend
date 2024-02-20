import React from "react";

interface PriceAndChangeProps {
  price: number | null;
  priceChange: number | null;
  quoteCurrency: string;
}

export function PriceAndChange(props: PriceAndChangeProps) {
  // TODO: lolo state?
  const changeValueStyle: string = props.priceChange! < 0 ? "text__red" : "text__green";
  const changeValueArrow: string = props.priceChange! < 0 ? "▼" : "▲ +";

  return (
    <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
      <div className="text-lg-end text-start">
        <h5 className="mb-2 text-white helvetica">{props.price && ` ${props.quoteCurrency} ${props.price.toFixed(2)} `}</h5>
        {props.priceChange && (
          <h5 className={`mb-0 fw-500 ${changeValueStyle} helvetica`}>
            {changeValueArrow}
            {props.priceChange.toFixed(2)}%
          </h5>
        )}
      </div>
    </div>
  );
}
