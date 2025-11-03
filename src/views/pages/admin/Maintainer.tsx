import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services";
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
import { ArrowLeft, User, Mail, Check, X, Calendar, DollarSign, Clock, Code, GitBranch, Shield } from "lucide-react";
import { SelectField } from "src/views/components/ui/forms/select-field";
import { Textarea } from "src/views/components/ui/forms/textarea";
import { Button } from "src/views/components/ui/forms/button";
import { Badge } from "src/views/components/ui/badge";
import { VerificationStatusCompanion, VerificationRecordCompanion } from "src/ultils/companions";

export function Maintainer() {
  const { githubUsername } = useParams<{ githubUsername: string }>();
  const [profile, setProfile] = useState<dto.FullDeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  // Profile verification editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileStatus, setProfileStatus] = useState<dto.VerificationStatus>(dto.VerificationStatus.PENDING_REVIEW);
  const [profileNotes, setProfileNotes] = useState("");

  // Project verification editing
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectStatus, setProjectStatus] = useState<dto.VerificationStatus>(dto.VerificationStatus.PENDING_REVIEW);
  const [projectNotes, setProjectNotes] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const adminAPI = getAdminBackendAPI();

  useEffect(() => {
    if (!githubUsername) return;

    const fetchProfile = async () => {
      const apiCall = async () => {
        const params = { githubUsername };
        const query = {};
        return await getAdminBackendAPI().getDeveloperProfile(params, query);
      };

      const onSuccess = (response: dto.GetDeveloperProfileResponse) => {
        setProfile(response.profile);
        if (response.profile?.profileEntry) {
          const currentStatus = VerificationRecordCompanion.getCurrentStatus(
            response.profile.profileEntry.verificationRecords,
            response.profile.profileEntry.profile.id.uuid,
          );
          const currentNotes = VerificationRecordCompanion.getCurrentNotes(
            response.profile.profileEntry.verificationRecords,
            response.profile.profileEntry.profile.id.uuid,
          );
          setProfileStatus(currentStatus);
          setProfileNotes(currentNotes || "");
        }
      };

      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    };

    fetchProfile();
  }, [githubUsername]);

  const handleSaveProfileVerification = async () => {
    if (!profile?.profileEntry?.profile.id) return;

    setIsUpdating(true);
    const apiCall = async () => {
      return await adminAPI.createVerificationRecord(
        {},
        {
          entityType: dto.VerificationEntityType.DEVELOPER_PROFILE,
          entityId: profile.profileEntry!.profile.id.uuid,
          status: profileStatus,
          notes: profileNotes.trim() || undefined,
        },
        {},
      );
    };

    const onSuccess = (response: any) => {
      // Add the new verification record to the profile entry
      setProfile(prev => {
        if (!prev || !prev.profileEntry) return prev;

        const newRecord = response.record;
        const updatedRecords = [...prev.profileEntry.verificationRecords, newRecord];

        return {
          ...prev,
          profileEntry: {
            ...prev.profileEntry,
            verificationRecords: updatedRecords,
          },
        };
      });
      setIsEditingProfile(false);
    };

    await handleApiCall(apiCall, setIsUpdating, setApiError, onSuccess);
  };

  const handleSaveProjectVerification = async (projectEntry: dto.DeveloperProjectItemEntry) => {
    setIsUpdating(true);
    const apiCall = async () => {
      return await adminAPI.createVerificationRecord(
        {},
        {
          entityType: dto.VerificationEntityType.DEVELOPER_PROJECT_ITEM,
          entityId: projectEntry.developerProjectItem.id.uuid,
          status: projectStatus,
          notes: projectNotes.trim() || undefined,
        },
        {},
      );
    };

    const onSuccess = (response: any) => {
      // Add the new verification record to the project entry
      setProfile(prev => {
        if (!prev) return prev;

        const newRecord = response.record;

        return {
          ...prev,
          projects: prev.projects.map(p =>
            p.developerProjectItem.id.uuid === projectEntry.developerProjectItem.id.uuid
              ? {
                  ...p,
                  verificationRecords: [...(p.verificationRecords || []), newRecord],
                }
              : p,
          ),
        };
      });
      setEditingProjectId(null);
    };

    await handleApiCall(apiCall, setIsUpdating, setApiError, onSuccess);
  };

  const startEditingProject = (projectEntry: dto.DeveloperProjectItemEntry) => {
    setEditingProjectId(projectEntry.developerProjectItem.id.uuid);
    const currentStatus = VerificationRecordCompanion.getCurrentStatus(projectEntry.verificationRecords, projectEntry.developerProjectItem.id.uuid);
    const currentNotes = VerificationRecordCompanion.getCurrentNotes(projectEntry.verificationRecords, projectEntry.developerProjectItem.id.uuid);
    setProjectStatus(currentStatus);
    setProjectNotes(currentNotes || "");
  };

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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              {profile.profileEntry && (
                <Badge
                  variant={VerificationStatusCompanion.variant(
                    VerificationRecordCompanion.getCurrentStatus(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid),
                  )}
                >
                  {VerificationStatusCompanion.label(
                    VerificationRecordCompanion.getCurrentStatus(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid),
                  )}
                </Badge>
              )}
            </div>
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
                <p className="text-white text-xs font-mono">{profile.profileEntry?.profile.id.uuid || "N/A"}</p>
              </div>
            </div>

            {/* Verification Controls */}
            <div className="mt-6 pt-6 border-t border-brand-neutral-700">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verification Status
              </h3>

              {!isEditingProfile ? (
                <div className="space-y-3">
                  {profile.profileEntry && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm mb-1">
                          Status:{" "}
                          <Badge
                            variant={VerificationStatusCompanion.variant(
                              VerificationRecordCompanion.getCurrentStatus(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid),
                            )}
                            className="ml-2"
                          >
                            {VerificationStatusCompanion.label(
                              VerificationRecordCompanion.getCurrentStatus(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid),
                            )}
                          </Badge>
                        </p>
                        {VerificationRecordCompanion.getCurrentNotes(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid) && (
                          <p className="text-brand-neutral-400 text-sm italic mt-2">
                            "{VerificationRecordCompanion.getCurrentNotes(profile.profileEntry.verificationRecords, profile.profileEntry.profile.id.uuid)}"
                          </p>
                        )}
                      </div>
                      <Button onClick={() => setIsEditingProfile(true)} variant="outline" size="sm">
                        Update Status
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <SelectField
                    label="Verification Status"
                    options={VerificationStatusCompanion.selectOptions()}
                    value={profileStatus}
                    onChange={value => setProfileStatus(value as dto.VerificationStatus)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-brand-neutral-300 mb-2">Admin Notes</label>
                    <Textarea
                      value={profileNotes}
                      onChange={e => setProfileNotes(e.target.value)}
                      placeholder="Add notes, questions, or feedback for the developer..."
                      rows={3}
                      className="bg-[#14233A] border-brand-neutral-700 text-white"
                    />
                    <p className="text-xs text-brand-neutral-500 mt-1">These notes will be visible to the developer</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfileVerification} disabled={isUpdating} size="sm">
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button onClick={() => setIsEditingProfile(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
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
                  <p className="text-white">{profile.settings.hourlyWeeklyCommitment ? `${profile.settings.hourlyWeeklyCommitment} hours/week` : "N/A"}</p>
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
                {profile.projects.map((entry, idx) => {
                  const isEditing = editingProjectId === entry.developerProjectItem.id.uuid;

                  return (
                    <div key={idx} className="bg-[#14233A] rounded-lg p-4 border border-brand-neutral-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-medium">{SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}</h3>
                            <Badge
                              variant={VerificationStatusCompanion.variant(
                                VerificationRecordCompanion.getCurrentStatus(entry.verificationRecords, entry.developerProjectItem.id.uuid),
                              )}
                            >
                              {VerificationStatusCompanion.label(
                                VerificationRecordCompanion.getCurrentStatus(entry.verificationRecords, entry.developerProjectItem.id.uuid),
                              )}
                            </Badge>
                          </div>
                          <p className="text-brand-neutral-400 text-sm">{entry.projectItem.projectItemType}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {entry.projectItem.projectItemType === dto.ProjectItemType.GITHUB_REPOSITORY && (
                            <a
                              href={`https://github.com/${SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-accent hover:text-brand-accent-dark text-sm"
                            >
                              View →
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
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

                      {/* Verification Controls */}
                      <div className="pt-3 border-t border-brand-neutral-700">
                        {!isEditing ? (
                          <div className="space-y-2">
                            {VerificationRecordCompanion.getCurrentNotes(entry.verificationRecords, entry.developerProjectItem.id.uuid) && (
                              <p className="text-brand-neutral-400 text-sm italic">
                                "{VerificationRecordCompanion.getCurrentNotes(entry.verificationRecords, entry.developerProjectItem.id.uuid)}"
                              </p>
                            )}
                            <Button onClick={() => startEditingProject(entry)} variant="outline" size="sm" className="w-full">
                              Update Verification
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <SelectField
                              label="Status"
                              options={VerificationStatusCompanion.selectOptions()}
                              value={projectStatus}
                              onChange={value => setProjectStatus(value as dto.VerificationStatus)}
                            />
                            <div>
                              <label className="block text-sm font-medium text-brand-neutral-300 mb-2">Notes</label>
                              <Textarea
                                value={projectNotes}
                                onChange={e => setProjectNotes(e.target.value)}
                                placeholder="Add notes or questions about this project..."
                                rows={2}
                                className="bg-[#0F1829] border-brand-neutral-700 text-white text-sm"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => handleSaveProjectVerification(entry)} disabled={isUpdating} size="sm">
                                {isUpdating ? "Saving..." : "Save"}
                              </Button>
                              <Button onClick={() => setEditingProjectId(null)} variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
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

              {/* Open to Bigger Opportunities Banner */}
              {profile.settings?.openToOtherOpportunity && (
                <div className="mb-4 bg-brand-accent/10 border border-brand-accent/30 rounded-lg p-3">
                  <p className="text-brand-accent text-sm font-medium">Open to Bigger Opportunities: {profile.settings.openToOtherOpportunity}</p>
                  {profile.settings.openToOtherOpportunityComment && (
                    <p className="text-brand-neutral-400 text-xs mt-1 italic">{profile.settings.openToOtherOpportunityComment}</p>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {profile.services.map((entry, idx) => {
                  const serviceInfo = ServiceTypeCompanion.info(entry.service.serviceType);
                  const Icon = serviceInfo.icon;

                  // Determine project scope for this service
                  const serviceProjectIds = entry.developerService?.developerProjectItemIds || [];
                  const allProjectIds = profile.projects.map(p => p.developerProjectItem.id.uuid);
                  const isAllProjects = serviceProjectIds.length === allProjectIds.length && serviceProjectIds.every(id => allProjectIds.includes(id));

                  const serviceProjects = isAllProjects ? [] : profile.projects.filter(p => serviceProjectIds.includes(p.developerProjectItem.id.uuid));

                  return (
                    <div key={idx} className="bg-[#14233A] rounded-lg p-4 border border-brand-neutral-700">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-brand-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{entry.service.name}</h3>
                          <p className="text-brand-neutral-400 text-sm">{entry.service.description}</p>

                          {/* Show projects if service applies to subset only */}
                          {serviceProjects.length > 0 && (
                            <div className="mt-2">
                              <p className="text-brand-neutral-400 text-xs mb-1">Applies to:</p>
                              <div className="flex flex-wrap gap-1">
                                {serviceProjects.map((p, pIdx) => (
                                  <Badge key={pIdx} variant="outline" className="text-xs">
                                    {SourceIdentifierCompanion.displayName(p.projectItem.sourceIdentifier)}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {entry.developerService && (
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <p className="text-brand-neutral-400 text-xs">Hourly Rate</p>
                                <p className="text-white text-sm">
                                  {entry.developerService.hourlyRate ? `${entry.developerService.hourlyRate}/hr` : "Default rate"}
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

                          {entry.developerService?.comment && <p className="text-brand-neutral-400 text-xs mt-2 italic">{entry.developerService.comment}</p>}
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
