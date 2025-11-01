import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { getOnboardingBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils";
import { paths } from "src/paths";
import {
  SourceIdentifierCompanion,
  CurrencyCompanion,
  ResponseTimeTypeCompanion,
  ServiceTypeCompanion,
  DeveloperRoleTypeCompanion,
  MergeRightsTypeCompanion,
} from "src/ultils/companions";
import { ArrowLeft, User, Mail, Check, X, Calendar, DollarSign, Clock, Code, GitBranch } from "lucide-react";

export function UserOnboarding() {
  const { githubUsername } = useParams<{ githubUsername: string }>();
  const [profile, setProfile] = useState<dto.FullDeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (!githubUsername) return;

    const fetchProfile = async () => {
      const apiCall = async () => {
        const params: dto.GetDeveloperProfileParams = {};
        const query: dto.GetDeveloperProfileQuery = { githubUsername };
        return await getOnboardingBackendAPI().getDeveloperProfile(params, query);
      };

      const onSuccess = (response: dto.GetDeveloperProfileResponse) => {
        setProfile(response.profile);
      };

      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    };

    fetchProfile();
  }, [githubUsername]);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#14233A] flex items-center justify-center">
          <LoadingState message="Loading user profile..." variant="spinner" size="lg" />
        </div>
      </PageWrapper>
    );
  }

  if (apiError) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#14233A] p-8">
          <div className="max-w-4xl mx-auto">
            <Link to={paths.ADMIN.HOME} className="inline-flex items-center text-brand-accent hover:text-brand-accent-dark mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Link>
            <ServerErrorAlert error={apiError} />
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!profile) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#14233A] p-8">
          <div className="max-w-4xl mx-auto">
            <Link to={paths.ADMIN.HOME} className="inline-flex items-center text-brand-accent hover:text-brand-accent-dark mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Link>
            <div className="bg-[#1A2B45] rounded-lg p-8 text-center">
              <p className="text-white text-lg">No profile found for user: {githubUsername}</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#14233A] p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Link to={paths.ADMIN.HOME} className="inline-flex items-center text-brand-accent hover:text-brand-accent-dark mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Link>

          <h1 className="text-white text-3xl font-semibold mb-2">Developer Onboarding Profile</h1>
          <p className="text-brand-neutral-400 mb-8">GitHub: @{githubUsername}</p>

          {/* Personal Information */}
          <div className="bg-[#1A2B45] rounded-lg p-6 mb-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-brand-neutral-400 text-sm">Name</p>
                <p className="text-white">{profile.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-brand-neutral-400 text-sm">Contact Email</p>
                <p className="text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profile.contactEmail || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-brand-neutral-400 text-sm">Terms Agreed</p>
                <p className="text-white flex items-center gap-2">
                  {profile.agreedToTerms ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Yes
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-red-500" />
                      No
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-brand-neutral-400 text-sm">Profile ID</p>
                <p className="text-white text-xs font-mono">{profile.profile?.id?.uuid || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Settings & Preferences */}
          {profile.settings && (
            <div className="bg-[#1A2B45] rounded-lg p-6 mb-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Settings & Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-brand-neutral-400 text-sm">Income Streams</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.settings.incomeStreams && profile.settings.incomeStreams.length > 0 ? (
                      profile.settings.incomeStreams.map((stream, idx) => (
                        <span key={idx} className="bg-brand-accent/20 text-brand-accent px-2 py-1 rounded text-sm">
                          {stream}
                        </span>
                      ))
                    ) : (
                      <span className="text-white">N/A</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-brand-neutral-400 text-sm">Weekly Commitment</p>
                  <p className="text-white">
                    {profile.settings.hourlyWeeklyCommitment ? `${profile.settings.hourlyWeeklyCommitment} hours/week` : "N/A"}
                  </p>
                  {profile.settings.hourlyWeeklyCommitmentComment && (
                    <p className="text-brand-neutral-400 text-sm mt-1">{profile.settings.hourlyWeeklyCommitmentComment}</p>
                  )}
                </div>
                <div>
                  <p className="text-brand-neutral-400 text-sm">Open to Other Opportunities</p>
                  <p className="text-white">{profile.settings.openToOtherOpportunity || "N/A"}</p>
                  {profile.settings.openToOtherOpportunityComment && (
                    <p className="text-brand-neutral-400 text-sm mt-1">{profile.settings.openToOtherOpportunityComment}</p>
                  )}
                </div>
                <div>
                  <p className="text-brand-neutral-400 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Hourly Rate
                  </p>
                  <p className="text-white">
                    {profile.settings.hourlyRate && profile.settings.currency
                      ? `${CurrencyCompanion.symbol(profile.settings.currency)}${profile.settings.hourlyRate}/hr`
                      : "N/A"}
                  </p>
                  {profile.settings.hourlyRateComment && <p className="text-brand-neutral-400 text-sm mt-1">{profile.settings.hourlyRateComment}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <div className="bg-[#1A2B45] rounded-lg p-6 mb-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Open Source Projects ({profile.projects.length})
              </h2>
              <div className="space-y-4">
                {profile.projects.map((entry, idx) => (
                  <div key={idx} className="bg-[#14233A] rounded-lg p-4 border border-brand-neutral-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}</h3>
                        <p className="text-brand-neutral-400 text-sm">{entry.projectItem.projectItemType}</p>
                      </div>
                      {entry.projectItem.projectItemType === dto.ProjectItemType.GITHUB_REPOSITORY && (
                        <a
                          href={`https://github.com/${SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-accent hover:text-brand-accent-dark"
                        >
                          View →
                        </a>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-brand-neutral-400 text-xs">Role</p>
                        <p className="text-white text-sm">
                          {entry.developerProjectItem.roles?.map(role => DeveloperRoleTypeCompanion.label(role)).join(", ") || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-brand-neutral-400 text-xs">Merge Rights</p>
                        <p className="text-white text-sm">
                          {entry.developerProjectItem.mergeRights?.map(mr => MergeRightsTypeCompanion.label(mr)).join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {profile.services && profile.services.length > 0 && (
            <div className="bg-[#1A2B45] rounded-lg p-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Services Offered ({profile.services.length})
              </h2>
              <div className="space-y-4">
                {profile.services.map((entry, idx) => {
                  const serviceInfo = ServiceTypeCompanion.info(entry.service.serviceType);
                  const Icon = serviceInfo.icon;
                  return (
                    <div key={idx} className="bg-[#14233A] rounded-lg p-4 border border-brand-neutral-700">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-brand-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{entry.service.name}</h3>
                          <p className="text-brand-neutral-400 text-sm">{entry.service.description}</p>
                          {entry.developerService && (
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <p className="text-brand-neutral-400 text-xs">Hourly Rate</p>
                                <p className="text-white text-sm">
                                  {entry.developerService.hourlyRate
                                    ? `${entry.developerService.hourlyRate}/hr`
                                    : "Default rate"}
                                </p>
                              </div>
                              {entry.service.hasResponseTime && entry.developerService.responseTimeHours && (
                                <div>
                                  <p className="text-brand-neutral-400 text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Response Time
                                  </p>
                                  <p className="text-white text-sm">{ResponseTimeTypeCompanion.label(entry.developerService.responseTimeHours)}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

