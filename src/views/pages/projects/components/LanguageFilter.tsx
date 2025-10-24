import React from "react";
import { Check } from "lucide-react";

interface LanguageFilterProps {
  languages: string[]; // Dynamic list of languages from backend
  selectedLanguage: string | null;
  onSelectLanguage: (language: string | null) => void;
  className?: string;
}

export function LanguageFilter(props: LanguageFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${props.className ?? ""}`}>
      <button
        onClick={() => props.onSelectLanguage(null)}
        className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-lg border text-sm transition-all duration-200 ${
          props.selectedLanguage === null
            ? "bg-brand-accent text-white border-brand-accent"
            : "bg-background border-border hover:border-brand-accent/50 text-foreground hover:bg-card"
        }`}
      >
        {props.selectedLanguage === null && <Check className="w-3.5 h-3.5" />}
        <span>All Languages</span>
      </button>

      {props.languages.sort().map(language => (
        <button
          key={language}
          onClick={() => props.onSelectLanguage(language)}
          className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-lg border text-sm transition-all duration-200 ${
            props.selectedLanguage === language
              ? "bg-brand-accent text-white border-brand-accent"
              : "bg-background border-border hover:border-brand-accent/50 text-foreground hover:bg-card"
          }`}
        >
          {props.selectedLanguage === language && <Check className="w-3.5 h-3.5" />}
          <span>{language}</span>
        </button>
      ))}
    </div>
  );
}
