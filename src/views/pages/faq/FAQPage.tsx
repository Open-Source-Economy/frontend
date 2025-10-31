import React from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";
import { Button } from "../../components/ui/forms/button";
import { Badge } from "../../components/ui/badge";
import { paths } from "src/paths";
import { useFAQFilter } from "./hooks/useFAQFilter";
import { FAQCategoryFilter, FAQCategorySection, FAQEmptyState, FAQSearchBar } from "./components";

export function FAQPage() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filteredData } = useFAQFilter();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-neutral-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-secondary via-brand-neutral-100 to-brand-accent/10 py-16 border-b border-brand-neutral-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 bg-brand-accent/10 border-brand-accent/30 text-brand-accent">
                Help Center
              </Badge>
              <h1 className="text-brand-neutral-950 mb-4">Frequently Asked Questions</h1>
              <p className="text-brand-neutral-600 text-lg mb-8">
                Find answers to common questions about Open Source Economy, our services, pricing, and how we support the open source ecosystem.
              </p>
              <FAQSearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <FAQCategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {filteredData.length === 0 ? (
              <FAQEmptyState />
            ) : (
              <div className="space-y-12">
                {filteredData.map((category, catIdx) => (
                  <FAQCategorySection key={catIdx} category={category} categoryIndex={catIdx} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-br from-brand-accent/10 via-brand-secondary to-brand-highlight/10 py-16 border-t border-brand-neutral-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <h2 className="text-brand-neutral-900 mb-4">Still have questions?</h2>
            <p className="text-brand-neutral-600 text-lg mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <Link to={paths.CONTACT}>Contact Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={paths.PROJECTS}>Browse Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
