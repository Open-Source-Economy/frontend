import React from "react";
import { BaseURL } from "../../../../App";
import { PageWrapper } from "../../PageWrapper";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface CheckoutSuccessProps {}

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const session_id = queryParams.get("session_id");
  const mode = queryParams.get("mode");

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      Success!
      <div>Session ID: {session_id}</div>
      <div>Mode: {mode}</div>
    </PageWrapper>
  );
}
