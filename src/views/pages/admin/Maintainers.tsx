import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils";
import { paths } from "src/paths";
import { FullDeveloperProfileCompanion, SourceIdentifierCompanion, VerificationRecordCompanion, VerificationStatusCompanion } from "src/ultils/companions";
import { AlertCircle, ArrowRight, GitBranch, Mail, Search, ShieldCheck, Users } from "lucide-react";
import { Input } from "src/views/components/ui/forms/input";
import { SelectField } from "src/views/components/ui/forms/select-field";
import { Badge } from "src/views/components/ui/badge";

export function Maintainers() {
  const [allProfiles, setAllProfiles] = useState<dto.FullDeveloperProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<dto.VerificationStatus | "all">("all");
  const [expandedProfiles, setExpandedProfiles] = useState<Set<string>>(new Set());
  const [useLocalSearch, setUseLocalSearch] = useState(true);
  const adminAPI = getAdminBackendAPI();

  const fetchProfiles = async () => {
    const apiCall = async () => {
      // If using local search, fetch all profiles without filters
      // If using backend search, pass filters to the backend
      if (useLocalSearch) {
        return await adminAPI.getAllDeveloperProfiles({}, {});
      } else {
        return await adminAPI.getAllDeveloperProfiles(
          {},
          {
            verificationStatus: statusFilter === "all" ? undefined : statusFilter,
            searchTerm: searchTerm.trim() || undefined,
          },
        );
      }
    };

    const onSuccess = (response: any) => {
      setAllProfiles(response.profiles);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  };

  useEffect(
    () => {
      fetchProfiles();
      // When using local search, only fetch once (when mode changes)
      // When using backend search, refetch when search term or filter changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    useLocalSearch ? [useLocalSearch] : [useLocalSearch, statusFilter, searchTerm],
  );

  // Filtering logic - local or backend
  const profiles = useMemo(() => {
    if (!useLocalSearch) {
      // Backend search - profiles are already filtered
      return allProfiles;
    }

    // Local filtering
    let filtered = allProfiles;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(profile => {
        if (!profile.profileEntry) return false;
        const status = VerificationRecordCompanion.getCurrentStatus(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid);
        return status === statusFilter;
      });
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(profile => FullDeveloperProfileCompanion.matchesSearchTerm(profile, searchTerm));
    }

    return filtered;
  }, [allProfiles, statusFilter, searchTerm, useLocalSearch]);

  const getActionNeededCount = (profile: dto.FullDeveloperProfile): number => {
    let count = 0;

    // Check if profile needs action
    if (profile.profileEntry && VerificationRecordCompanion.needsAction(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid)) {
      count++;
    }

    // Check if any projects need action
    count += profile.projects.filter(p => VerificationRecordCompanion.needsAction(p.verificationRecords, p.developerProjectItem.id.uuid)).length;

    return count;
  };

  const toggleProfileExpansion = (profileId: string) => {
    setExpandedProfiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(profileId)) {
        newSet.delete(profileId);
      } else {
        newSet.add(profileId);
      }
      return newSet;
    });
  };

  // Statistics
  const stats = useMemo(() => {
    const total = profiles.length;
    const approved = profiles.filter(p => {
      if (!p.profileEntry) return false;
      const status = VerificationRecordCompanion.getCurrentStatus(p.profileEntry.verificationRecords, p.profileEntry.profile.id.uuid);
      return status === dto.VerificationStatus.APPROVED;
    }).length;
    const actionNeeded = profiles.filter(p => getActionNeededCount(p) > 0).length;
    return { total, verified: approved, actionNeeded };
  }, [profiles]);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#14233A] flex items-center justify-center">
          <LoadingState message="Loading maintainers..." variant="spinner" size="lg" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#14233A] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-semibold mb-2">Maintainers Dashboard</h1>
            <p className="text-brand-neutral-400">Manage and verify developer onboarding profiles</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1A2B45] rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-brand-accent" />
                <div>
                  <p className="text-brand-neutral-400 text-sm">Total Maintainers</p>
                  <p className="text-white text-2xl font-semibold">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A2B45] rounded-lg p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-brand-neutral-400 text-sm">Verified</p>
                  <p className="text-white text-2xl font-semibold">{stats.verified}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A2B45] rounded-lg p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-brand-neutral-400 text-sm">Action Needed</p>
                  <p className="text-white text-2xl font-semibold">{stats.actionNeeded}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {apiError && <ServerErrorAlert error={apiError} variant="compact" className="mb-6" />}

          {/* Search and Filters */}
          <div className="bg-[#1A2B45] rounded-lg p-6 mb-6">
            <div className="flex flex-col gap-4">
              {/* Search Mode Toggle */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-neutral-700">
                <div className="flex items-center gap-3">
                  <span className="text-brand-neutral-400 text-sm">Search Mode:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUseLocalSearch(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        useLocalSearch ? "bg-brand-accent text-white" : "bg-[#14233A] text-brand-neutral-400 hover:text-white"
                      }`}
                    >
                      Local (Instant)
                    </button>
                    <button
                      onClick={() => setUseLocalSearch(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !useLocalSearch ? "bg-brand-accent text-white" : "bg-[#14233A] text-brand-neutral-400 hover:text-white"
                      }`}
                    >
                      Backend
                    </button>
                  </div>
                </div>
                <span className="text-xs text-brand-neutral-500">{useLocalSearch ? "Searching locally for instant results" : "Searching via backend API"}</span>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-neutral-500" />
                  <Input
                    type="text"
                    placeholder="Search by name, email, or project..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#14233A] border-brand-neutral-700 text-white"
                  />
                </div>

                {/* Verification Status Filter */}
                <div className="w-64">
                  <SelectField
                    label="Filter by Status"
                    options={[{ value: "all", label: "All Statuses" }, ...VerificationStatusCompanion.selectOptions()]}
                    value={statusFilter}
                    onChange={value => setStatusFilter(value as dto.VerificationStatus | "all")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Maintainers List */}
          <div className="space-y-4">
            {profiles.length === 0 ? (
              <div className="bg-[#1A2B45] rounded-lg p-12 text-center">
                <p className="text-brand-neutral-400 text-lg">No maintainers found</p>
              </div>
            ) : (
              profiles.map((profile, idx) => {
                const profileName = profile.profileEntry?.user?.name || "Unnamed Developer";
                const githubUsername = FullDeveloperProfileCompanion.getGithubUsername(profile);
                const actionCount = getActionNeededCount(profile);
                const unapprovedProjects = profile.projects.filter(p =>
                  VerificationRecordCompanion.needsAction(p.verificationRecords, p.developerProjectItem.id.uuid),
                );
                const profileStatus = profile.profileEntry
                  ? VerificationRecordCompanion.getCurrentStatus(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid)
                  : dto.VerificationStatus.PENDING_REVIEW;

                const profileId = profile.profileEntry?.profile.id.uuid || `profile-${idx}`;
                const isExpanded = expandedProfiles.has(profileId);

                return (
                  <div key={idx} className="bg-[#1A2B45] rounded-lg p-6 hover:bg-[#1F3255] transition-colors">
                    <div className="flex items-start justify-between">
                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-lg font-semibold">{profileName}</h3>
                          <Badge variant={VerificationStatusCompanion.variant(profileStatus)}>{VerificationStatusCompanion.label(profileStatus)}</Badge>
                          {actionCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {actionCount} Action{actionCount > 1 ? "s" : ""} Needed
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-brand-neutral-400 mb-3">
                          {githubUsername && (
                            <span className="flex items-center gap-1">
                              <GitBranch className="w-4 h-4" />@{githubUsername}
                            </span>
                          )}
                          {profileEntry?.profile.contactEmail && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {profileEntry?.profile.contactEmail}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-4 h-4" />
                            {profile.projects.length} Project{profile.projects.length !== 1 ? "s" : ""}
                          </span>
                        </div>

                        {/* Projects List - Compact */}
                        {profile.projects.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {(isExpanded ? profile.projects : profile.projects.slice(0, 5)).map((entry, pIdx) => {
                              const projectStatus = VerificationRecordCompanion.getCurrentStatus(entry.verificationRecords, entry.developerProjectItem.id.uuid);
                              return (
                                <Badge key={pIdx} variant={VerificationStatusCompanion.variant(projectStatus)} className="text-xs">
                                  {SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}
                                </Badge>
                              );
                            })}
                            {profile.projects.length > 5 && (
                              <button
                                onClick={() => toggleProfileExpansion(profileId)}
                                className="px-3 py-1.5 text-sm text-brand-accent hover:text-brand-accent-dark hover:underline cursor-pointer transition-colors"
                              >
                                {isExpanded ? "Show less" : `+${profile.projects.length - 5} more`}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Unapproved Projects Alert */}
                        {unapprovedProjects.length > 0 && (
                          <div className="mt-3 text-sm text-yellow-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {unapprovedProjects.length} project{unapprovedProjects.length > 1 ? "s" : ""} need{unapprovedProjects.length === 1 ? "s" : ""}{" "}
                            review
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {githubUsername && (
                        <Link
                          to={paths.ADMIN.MAINTAINER(githubUsername)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-lg transition-colors"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
