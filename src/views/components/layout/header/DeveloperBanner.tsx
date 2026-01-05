import React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { paths } from "src/paths";
import { Button } from "../../ui/forms/button";

export function DeveloperBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-accent to-brand-highlight border-b border-brand-accent-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12 gap-3">
          <Code2 className="w-4 h-4 text-white" />
          <span className="text-white">Are you an OSS developer?</span>
          <Link to={paths.DEVELOPER_LANDING}>
            <Button
              variant="outline"
              size="sm"
              className="bg-brand-neutral-900 text-brand-accent hover:bg-brand-neutral-950 hover:text-brand-accent border-brand-neutral-900 h-8"
            >
              Register Here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
