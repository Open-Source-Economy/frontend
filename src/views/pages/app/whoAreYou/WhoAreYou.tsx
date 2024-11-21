import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";
import { Button } from "src/components/elements/Button";
import { Link } from "react-router-dom";

interface WhoAreYouProps {}

export function WhoAreYou(props: WhoAreYouProps) {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <p> What your main role ?</p>

      <Button audience={"DEVELOPER"} level="PRIMARY" asChild>
        <Link to="/request-maintainer-rights">MAINTAINER</Link>
      </Button>

      <Button audience={"USER"} level="PRIMARY" asChild>
        <Link to="/fund-issues">OPEN SOURCE USER</Link>
      </Button>
    </PageWrapper>
  );
}
