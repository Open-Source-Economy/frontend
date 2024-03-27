import React from "react";

interface TokenSymbolProps {
  tokenLogo: string;
  tokenCode: string;
}

export function TokenSymbol(props: TokenSymbolProps) {
  return (
    <>
      <img src={props.tokenLogo || ""} alt="" className="brandimg" />
      <h1 className="helvetica text-white mb-0">{props.tokenCode || ""}</h1>
    </>
  );
}
