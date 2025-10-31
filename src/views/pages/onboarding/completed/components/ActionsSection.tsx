import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, HelpCircle, Mail } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { paths } from "../../../../../paths";

/**
 * ActionsSection - Action buttons and footer for onboarding success page
 * Displays contact, FAQ, and home navigation options
 */
export const ActionsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to={paths.CONTACT} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full sm:w-auto">
            <Mail className="w-4 h-4 mr-2" />
            Questions? Reach Out
          </Button>
        </Link>
        <Link to={paths.FAQ} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full sm:w-auto">
            <HelpCircle className="w-4 h-4 mr-2" />
            Browse FAQ
          </Button>
        </Link>
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={() => navigate(paths.HOME)}
          className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark"
        >
          Back to Home
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <p className="text-sm text-brand-neutral-600 text-center">We'll send your application reference number to your email—keep it handy!</p>
    </div>
  );
};
