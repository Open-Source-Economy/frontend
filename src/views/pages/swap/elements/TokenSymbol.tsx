import React from "react";

import { Token } from "../../../../model/Token";

interface LogoProps {
  token: Token;
  tokenLogo: Map<Token, string>;
  tokenCode: Map<Token, string>;
}

export function TokenSymbol({ token, tokenLogo, tokenCode }: LogoProps) {
  return (
    <>
      <img src={tokenLogo.get(token) || ""} alt="" className="brandimg" />
      <h1 className="helvetica text-white mb-0">{tokenCode.get(token) || ""}</h1>
    </>
  );
}
