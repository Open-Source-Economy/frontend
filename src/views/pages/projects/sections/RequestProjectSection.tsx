import React from "react";
import { Link } from "react-router-dom";
import { Button } from "src/views/components/ui/forms/button";
import { Plus } from "lucide-react";
import { paths } from "src/paths";

interface RequestProjectSectionProps {
  searchQuery?: string;
  selectedCategory?: string | null;
  selectedLanguage?: string | null;
  onRequestProject?: () => void;
  className?: string;
  variant?: "default" | "fancy";
}

// ------------------------------------
// Content: semantic-only (no Tailwind)
// ------------------------------------
export const requestProjectContent = {
  variants: {
    fancy: {
      heading: "Can't Find Your Project?",
      description: "We're continuously expanding our network with the world's best open source projects and their expert maintainers.",
      primaryCta: "Request a Project",
      secondaryCta: "Contact Us",
    },
    default: {
      headings: {
        whenFiltered: "Can't Find What You're Looking For?",
        whenUnfiltered: "Want to See More Projects?",
      },
      baseDescription:
        "Our network is growing every day with new high-quality open source projects. Request a project you'd like to see, and we'll prioritize bringing expert maintainers on board.",
      filteredDescriptionPrefix: "We're continuously expanding our network of open source projects.",
      searchNotePrefix: "Your search for",
      searchNoteSuffix: "hasn't matched any projects yet, but we'd love to add it!",
      categoryNotePrefix: "We're actively adding more projects in the",
      categoryNoteSuffix: "category.",
      primaryCta: "Request a Project",
      secondaryCta: "Contact Us",
    },
  },
} as const;

// ------------------------------------
// Main component
// ------------------------------------
export function RequestProjectSection(props: RequestProjectSectionProps) {
  const hasSearch = Boolean(props.searchQuery && props.searchQuery.length > 0);
  const hasCategory = props.selectedCategory !== null && props.selectedCategory !== undefined;
  const hasLanguage = props.selectedLanguage !== null && props.selectedLanguage !== undefined;
  const variant = props.variant ?? "default";

  // Helpers (no Tailwind here)
  const getDefaultHeading = (hasFilters: boolean) =>
    hasFilters ? requestProjectContent.variants.default.headings.whenFiltered : requestProjectContent.variants.default.headings.whenUnfiltered;

  const getDefaultDescription = () => {
    const v = requestProjectContent.variants.default;
    if (hasSearch || hasCategory || hasLanguage) {
      return (
        <>
          {v.filteredDescriptionPrefix}
          {hasSearch && (
            <span>
              {" "}
              {v.searchNotePrefix} <span className="text-brand-accent">&quot;{props.searchQuery}&quot;</span> {v.searchNoteSuffix}
            </span>
          )}
          {!hasSearch && hasCategory && !hasLanguage && (
            <span>
              {" "}
              {v.categoryNotePrefix} <span className="text-brand-accent">{props.selectedCategory}</span> {v.categoryNoteSuffix}
            </span>
          )}
          {!hasSearch && !hasCategory && hasLanguage && (
            <span>
              {" "}
              We're actively adding more <span className="text-brand-accent">{props.selectedLanguage}</span> projects.
            </span>
          )}
          {!hasSearch && hasCategory && hasLanguage && (
            <span>
              {" "}
              We're actively adding more <span className="text-brand-accent">{props.selectedLanguage}</span> projects in the{" "}
              <span className="text-brand-accent">{props.selectedCategory}</span> category.
            </span>
          )}
        </>
      );
    }
    return v.baseDescription;
  };

  // Fancy variant
  if (variant === "fancy") {
    const v = requestProjectContent.variants.fancy;
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-brand-card-blue-dark/50 border border-brand-accent/20 rounded-2xl p-12 shadow-lg shadow-brand-accent/10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/30 mb-6">
            <Plus className="w-8 h-8 text-brand-accent" />
          </div>

          <h2 className="text-brand-neutral-950 mb-4">{v.heading}</h2>
          <p className="text-brand-neutral-700 mb-10 max-w-2xl mx-auto">{v.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-brand-accent hover:bg-brand-accent-dark text-white shadow-lg shadow-brand-accent/25 hover:shadow-xl hover:shadow-brand-accent/30 transition-all"
            >
              <Link to={`${paths.CONTACT}?reason=request-project`}>
                <Plus className="w-4 h-4 mr-2" />
                {v.primaryCta}
              </Link>
            </Button>
            {/*<Button*/}
            {/*  asChild*/}
            {/*  variant="outline"*/}
            {/*  className="border-brand-accent/40 hover:bg-brand-accent/10 hover:border-brand-accent/60 text-brand-neutral-900 transition-all"*/}
            {/*>*/}
            {/*  <Link to={paths.CONTACT}>*/}
            {/*    <MessageCircle className="w-4 h-4 mr-2" />*/}
            {/*    {v.secondaryCta}*/}
            {/*  </Link>*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  const v = requestProjectContent.variants.default;
  return (
    <div className={`bg-card border border-border rounded-xl p-8 md:p-12 text-center ${props.className ?? ""}`}>
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-accent/10 rounded-lg mb-6">
          <Plus className="w-6 h-6 text-brand-accent" />
        </div>

        <h3 className="mb-4 text-foreground">{getDefaultHeading(hasSearch || hasCategory || hasLanguage)}</h3>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{getDefaultDescription()}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-brand-accent hover:bg-brand-accent-dark text-white">
            <Link to={`${paths.CONTACT}?reason=request-project`}>
              <Plus className="w-4 h-4 mr-2" />
              {v.primaryCta}
            </Link>
          </Button>
          {/*<Button asChild variant="outline" className="border-border hover:bg-card">*/}
          {/*  <Link to={paths.CONTACT}>*/}
          {/*    <MessageCircle className="w-4 h-4 mr-2" />*/}
          {/*    {v.secondaryCta}*/}
          {/*  </Link>*/}
          {/*</Button>*/}
        </div>
      </div>
    </div>
  );
}
