import React from "react";
import { Button } from "src/views/components/ui/forms/button";
import { MessageSquare, Plus } from "lucide-react";

interface EmptyServicesStateProps {
  onAddService: () => void;
  isMaybeLater?: boolean;
}

export const EmptyServicesState: React.FC<EmptyServicesStateProps> = ({ onAddService, isMaybeLater = false }) => {
  return (
    <div className="text-center py-16 rounded-xl border border-brand-neutral-300/30 max-w-4xl">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mx-auto">
          <MessageSquare className="w-8 h-8 text-brand-accent" />
        </div>
        <div>
          <h3 className="text-brand-neutral-900 mb-2">{isMaybeLater ? "Help us prepare for your future" : "No services added yet"}</h3>
          <p className="text-brand-neutral-600 text-sm">
            {isMaybeLater ? (
              <>
                We understand you don't want to provide open source services right now. However, to secure potential future contracts and funding for you, we
                need to know what you would be interested in offering in the future.
                <span className="block mt-2 font-medium text-brand-accent">
                  Knowing your future interests allows us to start the outreach process to enterprises on your behalf.
                </span>
              </>
            ) : (
              "Select one or multiple services at once to let clients know what you can offer. Choose from predefined services across different categories."
            )}
          </p>
        </div>
        <Button
          onClick={onAddService}
          className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isMaybeLater ? "Select Future Services" : "Add Services"}
        </Button>
      </div>
    </div>
  );
};
