import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, MessageCircle, Zap } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { paths } from "../../../../../paths";

interface CTASectionProps {
  onGitHubSignIn: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGitHubSignIn }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-card-blue via-brand-card-blue-dark to-brand-secondary border-t border-brand-neutral-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-gradient-to-br from-brand-accent/10 via-brand-card-blue to-brand-highlight/10 border-2 border-brand-accent rounded-3xl p-12 text-center shadow-2xl shadow-brand-accent/20">
          <div className="w-20 h-20 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center mx-auto mb-6">
            <Zap className="h-10 w-10 text-brand-accent" />
          </div>

          <h2 className="text-brand-neutral-950 mb-4">Ready to Get Started?</h2>

          <p className="text-brand-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
            Sign in with GitHub to set up your profile, define your services, and start earning. We'll handle finding clients and all the business side.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" onClick={onGitHubSignIn} className="bg-brand-accent hover:bg-brand-accent-dark text-white shadow-xl">
              <Github className="h-5 w-5 mr-2" />
              Sign in with GitHub
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Link to={paths.CONTACT} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-brand-neutral-300 hover:bg-brand-card-blue">
                <MessageCircle className="h-5 w-5 mr-2" />
                Book a Call
              </Button>
            </Link>
          </div>

          <p className="text-brand-neutral-500 text-sm">Join the growing community of maintainers getting fairly compensated for their work</p>
        </div>
      </div>
    </section>
  );
};
