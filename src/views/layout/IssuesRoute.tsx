import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";
import { Audience } from "src/views";
import Loader from "src/components/common/Loader";

export function IssuesRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [audience, setAudience] = useState<Audience | null>(null);

  useEffect(() => {
    if (!audience) {
      if (auth.authInfo?.company !== null) {
        setAudience(Audience.USER);
      } else {
        setAudience(Audience.DEVELOPER);
      }
    }
  }, [auth.authInfo]);

  useEffect(() => {
    if (audience == Audience.USER) {
      navigate("/fund-issues");
    } else if (audience == Audience.DEVELOPER) {
      navigate("/manage-issues");
    }
  }, [audience, navigate]);

  return <Loader />;
}
