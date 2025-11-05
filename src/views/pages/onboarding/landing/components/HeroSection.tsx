import React from "react";
import { Link } from "react-router-dom";
import { Code2, Github, MessageCircle } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { paths } from "../../../../../paths";

interface HeroSectionProps {
  onGitHubSignIn: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGitHubSignIn }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-neutral-100 to-brand-accent/10 py-20 border-b border-brand-neutral-300">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-highlight/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-6">
            <Code2 className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-primary uppercase tracking-wider">For Open Source Maintainers</span>
          </div>

          <h1 className="text-brand-neutral-950 mb-6">Get Paid for Your Open Source Work</h1>

          <p className="text-brand-neutral-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            A Swiss non-profit that helps open source developers get funding — full-time, part-time, or just every now and then. We adapt to your needs and
            values, whether you're aligned with free software ideals or focused on sustainability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onGitHubSignIn} className="bg-brand-accent hover:bg-brand-accent-dark text-white shadow-xl">
              <Github className="h-5 w-5 mr-2" />
              Sign in with GitHub
            </Button>
            <Link to={paths.CONTACT} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-brand-neutral-300 hover:bg-brand-card-blue">
                <MessageCircle className="h-5 w-5 mr-2" />
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
