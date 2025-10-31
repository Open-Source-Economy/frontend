import React from "react";
import * as dto from "@open-source-economy/api-types";
import { Check, Search, X } from "lucide-react";
import { SourceIdentifierCompanion } from "src/ultils/companions";

interface ProjectSelectorProps {
  projects: dto.DeveloperProjectItemEntry[];
  selectedIds: dto.DeveloperProjectItemId[];
  onChange: (selectedIds: dto.DeveloperProjectItemId[]) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, selectedIds, onChange }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const safeProjects = projects || [];
  const safeSelectedIds = selectedIds || [];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  // Filter projects based on search query
  const filteredProjects = React.useMemo(() => {
    if (!searchQuery.trim()) return safeProjects;

    const query = searchQuery.toLowerCase();
    return safeProjects.filter(projectEntry => {
      const projectName = SourceIdentifierCompanion.displayName(projectEntry.projectItem.sourceIdentifier).toLowerCase();
      return projectName.includes(query);
    });
  }, [safeProjects, searchQuery]);

  // Sort projects: selected first, then alphabetically
  const sortedProjects = React.useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      const aSelected = safeSelectedIds.some(id => id.uuid === a.developerProjectItem.id.uuid);
      const bSelected = safeSelectedIds.some(id => id.uuid === b.developerProjectItem.id.uuid);

      // Selected items first
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;

      // Then alphabetically by name
      const aName = SourceIdentifierCompanion.displayName(a.projectItem.sourceIdentifier);
      const bName = SourceIdentifierCompanion.displayName(b.projectItem.sourceIdentifier);
      return aName.localeCompare(bName);
    });
  }, [filteredProjects, safeSelectedIds]);

  const toggleProject = (projectId: dto.DeveloperProjectItemId) => {
    const exists = safeSelectedIds.some(id => id.uuid === projectId.uuid);
    if (exists) {
      onChange(safeSelectedIds.filter(id => id.uuid !== projectId.uuid));
    } else {
      onChange([...safeSelectedIds, projectId]);
    }
  };

  const allProjectsSelected = React.useMemo(() => {
    if (safeProjects.length === 0) return false;
    return safeProjects.every(project => safeSelectedIds.some(id => id.uuid === project.developerProjectItem.id.uuid));
  }, [safeProjects, safeSelectedIds]);

  const toggleAll = () => {
    if (allProjectsSelected) {
      onChange([]);
    } else {
      onChange(safeProjects.map(p => p.developerProjectItem.id));
    }
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  const filteredSelectedCount = filteredProjects.filter(p => safeSelectedIds.some(id => id.uuid === p.developerProjectItem.id.uuid)).length;
  const isFiltering = searchQuery.trim().length > 0;

  return (
    <div className="space-y-3">
      {/* Selected Projects as Chips */}
      {safeSelectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {safeSelectedIds.map(projectId => {
            const projectEntry = safeProjects.find(p => p.developerProjectItem.id.uuid === projectId.uuid);
            if (!projectEntry) return null;
            const displayName = SourceIdentifierCompanion.displayName(projectEntry.projectItem.sourceIdentifier);

            return (
              <div
                key={projectId.uuid}
                className="inline-flex items-center px-3 py-1.5 text-sm gap-2 rounded-lg bg-gradient-to-r from-brand-accent/15 to-brand-highlight/15 border border-brand-accent/30 transition-colors hover:from-brand-accent/20 hover:to-brand-highlight/20"
              >
                <span className="text-brand-accent">{displayName}</span>
                <button
                  onClick={() => toggleProject(projectId)}
                  className="text-brand-accent/70 hover:text-brand-error transition-colors cursor-pointer"
                  aria-label={`Remove ${displayName}`}
                  type="button"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Search Input with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-neutral-500 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search projects..."
          autoFocus={false}
          className="w-full pl-9 pr-9 py-2 bg-brand-card-blue border border-brand-neutral-300 rounded-lg text-sm text-brand-neutral-900 placeholder:text-brand-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-brand-neutral-300/50 rounded transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5 text-brand-neutral-500" />
          </button>
        )}

        {/* Dropdown with Projects */}
        {showDropdown && (
          <div className="absolute z-10 w-full mt-2 bg-brand-card-blue border border-brand-neutral-300/40 rounded-lg shadow-xl overflow-hidden">
            {/* Select All Toggle */}
            <div
              onClick={toggleAll}
              className="flex items-center gap-2.5 px-3 py-2.5 border-b border-brand-neutral-300/20 cursor-pointer hover:bg-brand-accent/5 transition-all"
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                  allProjectsSelected
                    ? "bg-brand-accent border-brand-accent"
                    : safeSelectedIds.length > 0
                      ? "bg-brand-accent/20 border-brand-accent"
                      : "border-brand-neutral-400"
                }`}
              >
                {allProjectsSelected && <Check className="w-3 h-3 text-white" />}
                {/*{!allProjectsSelected && safeSelectedIds.length > 0 && <Minus className="w-3 h-3 text-brand-accent" />}*/}
              </div>
              <span className="text-sm text-brand-neutral-800">All Projects</span>
              <span className="ml-auto text-xs text-brand-neutral-600">
                {safeSelectedIds.length}/{safeProjects.length}
              </span>
            </div>

            {/* Results Count (when filtering) */}
            {isFiltering && (
              <div className="px-3 py-2 text-xs text-brand-neutral-600 bg-brand-secondary-dark/30 border-b border-brand-neutral-300/20">
                Showing {filteredProjects.length} of {safeProjects.length} projects
                {filteredSelectedCount > 0 && ` · ${filteredSelectedCount} selected`}
              </div>
            )}

            {/* Individual Projects List */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1 relative z-10">
              {sortedProjects.length > 0 ? (
                sortedProjects.map(projectEntry => {
                  const isSelected = safeSelectedIds.some(id => id.uuid === projectEntry.developerProjectItem.id.uuid);
                  const displayName = SourceIdentifierCompanion.displayName(projectEntry.projectItem.sourceIdentifier);

                  return (
                    <button
                      type="button"
                      key={projectEntry.developerProjectItem.id.uuid}
                      onClick={() => toggleProject(projectEntry.developerProjectItem.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                        isSelected ? "bg-brand-accent/10 hover:bg-brand-accent/15" : "hover:bg-brand-secondary-dark"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? "bg-brand-accent border-brand-accent" : "border-brand-neutral-400"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-sm bg-white" />}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-sm text-brand-neutral-800 truncate">{displayName}</div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-6 text-center">
                  <p className="text-sm text-brand-neutral-500">No projects found matching "{searchQuery}"</p>
                  <button onClick={clearSearch} className="mt-2 text-xs text-brand-accent hover:text-brand-accent-dark transition-colors">
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Item Count */}
      {safeSelectedIds.length > 0 && (
        <p className="text-xs text-brand-neutral-600">
          {safeSelectedIds.length} project{safeSelectedIds.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};
