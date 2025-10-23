import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages";
import { Audience } from "src/views/index";
import { PageLoader } from "../components/common";
import { paths } from "src/paths";

export function IssuesRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [audience, setAudience] = useState<Audience | null>(null);

  useEffect(() => {
    if (!audience) {
      if ((auth.authInfo?.repositories ?? []).length == 0) {
        setAudience(Audience.USER);
      } else {
        setAudience(Audience.DEVELOPER);
      }
    }
  }, [auth.authInfo]);

  useEffect(() => {
    if (audience == Audience.USER) {
      navigate(paths.FUND_ISSUES);
    } else if (audience == Audience.DEVELOPER) {
      navigate(paths.MANAGE_ISSUES);
    }
  }, [audience, navigate]);

  return <PageLoader />;
}
