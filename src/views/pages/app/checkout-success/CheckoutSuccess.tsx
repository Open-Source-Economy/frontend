import React from "react";
import { BaseURL } from "../../../../App";
import { PageWrapper } from "../../PageWrapper";
import { useParams } from "react-router-dom";

interface CheckoutSuccessProps {}

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  const { session_id, mode } = useParams();
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      Success!
      <div>Session ID: {session_id}</div>
      <div>Mode: {mode}</div>
    </PageWrapper>
  );
}
