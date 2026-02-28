import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "src/views/auth";
import { Audience } from "src/views/index";
import { PageTransition } from "src/views/components/ui/page-transition";

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
      navigate({ to: "/fund-issues" as string });
    } else if (audience == Audience.DEVELOPER) {
      navigate({ to: "/manage-issues" as string });
    }
  }, [audience, navigate]);

  return <PageTransition isLoading={true} />;
}
