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

      <Button audience="ALL" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">
          <span className="relative z-20">ALL PRIMARY</span>
        </Link>
      </Button>
      <hr />
      <Button audience="ALL" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">
          <span className="relative z-20">ALL SECONDARY</span>
        </Link>
      </Button>

      <hr />

      <Button audience="DEVELOPER" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">DEVELOPER PRIMARY</Link>
      </Button>
      <hr />
      <Button audience="DEVELOPER" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">DEVELOPER SECONDARY</Link>
      </Button>

      <hr />

      <Button audience="USER" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">USER PRIMARY</Link>
      </Button>
      <hr />
      <Button audience="USER" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">USER SECONDARY</Link>
      </Button>

      <hr />
      <Button audience="STAKEHOLDER" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">STAKEHOLDER PRIMARY</Link>
      </Button>
      <hr />
      <Button audience="STAKEHOLDER" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">STAKEHOLDER SECONDARY</Link>
      </Button>

      <hr />

      <p> disable</p>

      <Button disabled={true} audience="ALL" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">
          <span className="relative z-10">ALL PRIMARY</span>
        </Link>
      </Button>
      <hr />
      <Button disabled={true} audience="ALL" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">
          <span className="z-10 relative">ALL SECONDARY</span>
        </Link>
      </Button>

      <hr />

      <Button disabled={true} audience="DEVELOPER" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">DEVELOPER PRIMARY</Link>
      </Button>
      <hr />
      <Button disabled={true} audience="DEVELOPER" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/request-maintainer-rights">DEVELOPER SECONDARY</Link>
      </Button>

      <hr />

      <Button disabled={true} audience="USER" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">USER PRIMARY</Link>
      </Button>
      <hr />
      <Button disabled={true} audience="USER" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">USER SECONDARY</Link>
      </Button>

      <hr />
      <Button disabled={true} audience="STAKEHOLDER" level="PRIMARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">STAKEHOLDER PRIMARY</Link>
      </Button>
      <hr />
      <Button disabled audience="STAKEHOLDER" level="SECONDARY" size="MEDIUM" asChild>
        <Link to="/fund-issues">STAKEHOLDER SECONDARY</Link>
      </Button>

      <hr />
    </PageWrapper>
  );
}
