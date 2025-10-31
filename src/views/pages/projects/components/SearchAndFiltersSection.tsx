import React from "react";
import { ProjectSearchBar } from "./ProjectSearchBar";
import { LanguageFilter } from "./LanguageFilter";
import { ProjectCategory } from "@open-source-economy/api-types";

interface SearchAndFiltersSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProjectCategory | null;
  onCategoryChange: (category: ProjectCategory | null) => void;
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
  availableLanguages: string[];
  hasResults: boolean;
  totalResults: number;
}

export function SearchAndFiltersSection(props: SearchAndFiltersSectionProps) {
  const hasActiveFilters = props.searchQuery || props.selectedCategory || props.selectedLanguage;

  const handleClearAll = () => {
    props.onCategoryChange(null);
    props.onLanguageChange(null);
  };

  return (
    <section className="py-12 border-b border-border bg-gradient-to-b from-brand-card-blue/30 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Search Bar with Enhanced Styling */}
          <div className="max-w-2xl mx-auto">
            <ProjectSearchBar value={props.searchQuery} onChange={props.onSearchChange} placeholder="Search projects by name, description, or tags..." />
          </div>

          {/* Filters Section with Better Visual Organization */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 bg-[rgba(26,41,66,0)]">
            <div className="flex items-center justify-between mb-4">
              {/*<div className="flex items-center gap-2">*/}
              {/*  <div className="w-1 h-5 bg-brand-accent rounded-full"></div>*/}
              {/*  <span className="text-sm text-muted-foreground">Refine your search</span>*/}
              {/*</div>*/}
              {(props.selectedCategory || props.selectedLanguage) && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-brand-accent hover:text-brand-accent-light transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-brand-accent/10"
                >
                  <span>Clear all</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/20 text-xs">
                    {(props.selectedCategory ? 1 : 0) + (props.selectedLanguage ? 1 : 0)}
                  </span>
                </button>
              )}
            </div>

            {/* Combined Filters Grid */}
            {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">*/}
            {/*  <div className="space-y-3">*/}
            {/*    <div className="flex items-center gap-2">*/}
            {/*      <label className="text-xs text-muted-foreground uppercase tracking-wider">Category</label>*/}
            {/*      {props.selectedCategory && <span className="text-xs text-brand-accent">({props.selectedCategory})</span>}*/}
            {/*    </div>*/}
            {/*    <CategoryFilter selectedCategory={props.selectedCategory} onSelectCategory={props.onCategoryChange} />*/}
            {/*  </div>*/}
            {/*  <div className="space-y-3">*/}
            {/*    <div className="flex items-center gap-2">*/}
            {/*      <label className="text-xs text-muted-foreground uppercase tracking-wider">Language</label>*/}
            {/*      {props.selectedLanguage && <span className="text-xs text-brand-accent">({props.selectedLanguage})</span>}*/}
            {/*    </div>*/}
            {/*    <LanguageFilter languages={props.availableLanguages} selectedLanguage={props.selectedLanguage} onSelectLanguage={props.onLanguageChange} />*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="flex-1">
              <LanguageFilter languages={props.availableLanguages} selectedLanguage={props.selectedLanguage} onSelectLanguage={props.onLanguageChange} />
            </div>
          </div>

          {/* Enhanced Results Summary */}
          {hasActiveFilters && (
            <div className="flex items-center justify-center gap-3 py-3">
              {props.hasResults ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {props.totalResults} {props.totalResults === 1 ? "project found" : "projects found"}
                    </span>
                  </div>
                  {(props.searchQuery || props.selectedCategory || props.selectedLanguage) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-brand-neutral-500">•</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {props.searchQuery && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-accent/10 text-brand-accent">
                            &quot;{props.searchQuery}&quot;
                          </span>
                        )}
                        {props.selectedCategory && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-accent/10 text-brand-accent">
                            {props.selectedCategory}
                          </span>
                        )}
                        {props.selectedLanguage && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-accent/10 text-brand-accent">
                            {props.selectedLanguage}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
                // <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-warning/10 border border-brand-warning/20">
                //   <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-warning/20">
                //     <span className="text-brand-warning text-sm">0</span>
                //   </div>
                //   <div className="text-sm">
                //     <span className="text-brand-warning">No projects found</span>
                //     {(props.searchQuery || props.selectedCategory || props.selectedLanguage) && (
                //       <span className="text-muted-foreground ml-2">Try adjusting your filters</span>
                //     )}
                //   </div>
                // </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
