import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";

interface RequestMaintainerRightsProps {}

export function RequestMaintainerRights(props: RequestMaintainerRightsProps) {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <p>You are an Open Source developer, and you are searching for fund? Send an email to Lauriane@open-source</p>
    </PageWrapper>
  );
}
