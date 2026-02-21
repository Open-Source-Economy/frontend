import React from "react";
import { Github } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { EmailDisplay } from "../components/auth/EmailDisplay";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { paths } from "src/paths";
import { useAuth } from "src/views/auth/AuthContext";
import { AuthPageWrapper } from "../AuthPageWrapper";

export function GithubNoticeStep() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as Record<string, string | undefined>;
  const auth = useAuth();

  // Get email from search params
  const email = searchParams.email || "";

  const handleGithubAuth = () => {
    auth.loginWithGitHub();
  };

  return (
    <AuthPageWrapper title="GitHub Account Found" description="Please continue with GitHub to access your account">
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <EmailDisplay email={email} />

        <div className="text-center p-6 bg-brand-accent/5 rounded-2xl border border-brand-accent/10 mb-6">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Github className="w-8 h-8 text-brand-accent" />
          </div>
          <p className="text-sm text-brand-neutral-600 mb-0">This account is managed through GitHub.</p>
        </div>

        <Button onClick={handleGithubAuth} className="w-full h-11" leftIcon={Github}>
          Sign In with GitHub
        </Button>

        <button
          onClick={() => {
            navigate({ to: paths.AUTH.IDENTIFY as string });
          }}
          className="w-full text-center text-sm font-bold text-brand-neutral-400 uppercase tracking-widest hover:text-brand-accent transition-colors py-2"
        >
          Try a different email
        </button>
      </div>
    </AuthPageWrapper>
  );
}
