import React, { useEffect, useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils";
import { Building2, GitBranch, Users } from "lucide-react";
import { getBackendAPI } from "src/services/BackendAPI";
import { ProjectItemWithDetailsCompanion } from "src/ultils/companions";
import { OrganizationWithSyncState } from "./components/types";
import { OrganizationCard } from "./components/OrganizationCard";
import { BulkSyncControls } from "./components/BulkSyncControls";
import { StatisticCard } from "./components/StatisticCard";
import { calculateEstimatedWaitTime } from "./components/utils";
export function OrganizationSyncPage() {
  const [organizations, setOrganizations] = useState<OrganizationWithSyncState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);
  const [bulkSyncProgress, setBulkSyncProgress] = useState<{ current: number; total: number } | null>(null);
  const [syncingOwnerIds, setSyncingOwnerIds] = useState<Set<string>>(new Set());
  const [bulkSyncQueue, setBulkSyncQueue] = useState<Set<string>>(new Set());
  const [bulkSyncCompleted, setBulkSyncCompleted] = useState<Set<string>>(new Set());
  const [bulkSyncQueueOrder, setBulkSyncQueueOrder] = useState<string[]>([]);
  const [msPerRepo, setMsPerRepo] = useState<number>(1000);
  const [globalFetchDetails, setGlobalFetchDetails] = useState(true);

  const adminAPI = getAdminBackendAPI();
  const backendAPI = getBackendAPI();
  // Fetch all project items and filter organizations
  const fetchOrganizations = async () => {
    try {
      const apiCall = async () => {
        return await backendAPI.getProjectItemsWithDetails(
          {},
          {
            repositories: { limit: 0 },
            owners: {},
            urls: { limit: 0 },
          },
        );
      };
      const onSuccess = (response: dto.GetProjectItemsWithDetailsResponse) => {
        if (!response || !response.owners) {
          console.warn("No owners in response");
          setOrganizations([]);
          return;
        }
        if (!Array.isArray(response.owners)) {
          console.error("response.owners is not an array:", response.owners);
          setOrganizations([]);
          return;
        }
        const orgs: OrganizationWithSyncState[] = response.owners.map(item => ({
          ...item,
          syncInProgress: false,
        }));
        setOrganizations(orgs);
      };
      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    } catch (error) {
      console.error("Error in fetchOrganizations:", error);
      setApiError(ApiError.from(error));
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleSync = async (projectItemId: string, offset: number = 0, batchSize?: number, fetchDetails: boolean = false) => {
    setSyncingIds(prev => new Set(prev).add(projectItemId));
    setSyncingIds(prev => {
      const newSet = new Set(prev);
      newSet.add(projectItemId);
      return newSet;
    });

    const apiCall = async () => {
      return await adminAPI.syncOrganizationRepositories({ projectItemId }, { offset, batchSize, fetchDetails });
    };
    const onSuccess = (response: dto.SyncOrganizationRepositoriesResponse) => {
      setOrganizations(prev => prev.map(org => (org.projectItem.id.uuid === projectItemId ? { ...org, lastSyncMessage: response.message } : org)));
      setTimeout(() => {
        setSyncingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(projectItemId);
          return newSet;
        });
      }, 2000);
    };
    const noopLoading = () => {};
    const success = await handleApiCall(apiCall, noopLoading, setApiError, onSuccess);
    if (!success) {
      setSyncingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectItemId);
        return newSet;
      });
    }
  };

  const handleSyncOwner = async (ownerLogin: string, projectItemId: string) => {
    setSyncingOwnerIds(prev => new Set(prev).add(projectItemId));

    const apiCall = async () => {
      return await adminAPI.syncOwner({ owner: ownerLogin }, {});
    };

    const onSuccess = (response: any) => {
      const owner = response?.owner || response;

      if (!owner || !owner.id) {
        console.error("Invalid owner response:", response);
        return;
      }

      setOrganizations(prev => prev.map(org => (org.projectItem.id.uuid === projectItemId ? { ...org, owner } : org)));

      if (owner.publicRepos !== undefined && owner.publicRepos !== null) {
        setSelectedIds(prev => new Set(prev).add(projectItemId));
      }

      setTimeout(() => {
        setSyncingOwnerIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(projectItemId);
          return newSet;
        });
      }, 1000);
    };

    const noopLoading = () => {};
    const success = await handleApiCall(apiCall, noopLoading, setApiError, onSuccess);

    if (!success) {
      setSyncingOwnerIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectItemId);
        return newSet;
      });
    }
  };

  const handleBulkSync = async () => {
    const selectedOrgs = organizations.filter(org => selectedIds.has(org.projectItem.id.uuid));

    if (selectedOrgs.length === 0) {
      alert("Please select at least one owner to sync");
      return;
    }

    const invalidOrgs = selectedOrgs.filter(org => !org.owner?.publicRepos);
    if (invalidOrgs.length > 0) {
      alert(`Cannot sync: ${invalidOrgs.length} owner(s) don't have public repo count available`);
      return;
    }

    setIsBulkSyncing(true);
    setBulkSyncProgress({ current: 0, total: selectedOrgs.length });
    setBulkSyncCompleted(new Set());

    const queueOrder = selectedOrgs.map(org => org.projectItem.id.uuid);
    setBulkSyncQueueOrder(queueOrder);
    setBulkSyncQueue(new Set(queueOrder));

    for (let i = 0; i < selectedOrgs.length; i++) {
      const org = selectedOrgs[i];
      const projectItemId = org.projectItem.id.uuid;
      const waitTime = org.owner!.publicRepos! * msPerRepo;

      setBulkSyncQueue(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectItemId);
        return newSet;
      });

      setBulkSyncProgress({ current: i + 1, total: selectedOrgs.length });

      await handleSync(projectItemId, 0, undefined, globalFetchDetails);

      setBulkSyncCompleted(prev => new Set(prev).add(projectItemId));

      if (i < selectedOrgs.length - 1) {
        console.log(`Waiting ${waitTime}ms (${org.owner!.publicRepos} repos) before next sync...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    setIsBulkSyncing(false);
    setBulkSyncProgress(null);
    setBulkSyncQueue(new Set());
    setBulkSyncQueueOrder([]);
    setTimeout(() => {
      setBulkSyncCompleted(new Set());
      setSelectedIds(new Set());
    }, 3000);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    const syncableOrgs = filteredOrganizations.filter(org => org.owner?.publicRepos !== undefined);
    if (selectedIds.size === syncableOrgs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(syncableOrgs.map(org => org.projectItem.id.uuid)));
    }
  };

  const filteredOrganizations = organizations.filter(org => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const login = org.owner?.id.login?.toLowerCase() || "";
    const name = org.owner?.name?.toLowerCase() || "";
    return login.includes(searchLower) || name.includes(searchLower);
  });
  const stats = React.useMemo(() => {
    return ProjectItemWithDetailsCompanion.getProjectItemsStats(organizations);
  }, [organizations]);
  const syncableCount = filteredOrganizations.filter(org => org.owner?.publicRepos !== undefined).length;
  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#14233A] flex items-center justify-center">
          <LoadingState message="Loading organizations..." variant="spinner" size="lg" />
        </div>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#14233A] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Owner Repository Sync</h1>
            <p className="text-gray-400">Sync repositories from GitHub organizations and users to create individual project items.</p>
          </div>
          {apiError && (
            <div className="mb-6">
              <ServerErrorAlert error={apiError} onDismiss={() => setApiError(null)} />
            </div>
          )}

          {/* Search and Bulk Actions */}
          <BulkSyncControls
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            msPerRepo={msPerRepo}
            onMsPerRepoChange={setMsPerRepo}
            globalFetchDetails={globalFetchDetails}
            onGlobalFetchDetailsChange={setGlobalFetchDetails}
            isBulkSyncing={isBulkSyncing}
            syncableCount={syncableCount}
            selectedCount={selectedIds.size}
            isAllSelected={selectedIds.size === syncableCount && syncableCount > 0}
            onToggleSelectAll={toggleSelectAll}
            onBulkSync={handleBulkSync}
            bulkSyncProgress={bulkSyncProgress}
          />
          {/* Search */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search organizations and users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-md"
              leftIcon={Building2}
            />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatisticCard icon={Building2} iconColor="text-blue-400" value={organizations.length} label="Total Owners" />
            <StatisticCard icon={Users} iconColor="text-purple-400" value={stats.totalMaintainers} label="Unique Maintainers" />
            <StatisticCard icon={GitBranch} iconColor="text-green-400" value={filteredOrganizations.length} label="Filtered Results" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{organizations.length}</div>
                  <div className="text-sm text-gray-400">Total Owners</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalMaintainers}</div>
                  <div className="text-sm text-gray-400">Unique Maintainers</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{filteredOrganizations.length}</div>
                  <div className="text-sm text-gray-400">Filtered Results</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{syncingIds.size}</div>
                  <div className="text-sm text-gray-400">Currently Syncing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Organizations List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            {filteredOrganizations.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No organizations found</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredOrganizations.map(org => {
                  const projectItemId = org.projectItem.id.uuid;
                  const isSyncing = syncingIds.has(projectItemId);
                  const isSyncingOwner = syncingOwnerIds.has(projectItemId);
                  const isSelected = selectedIds.has(projectItemId);
                  const canSync = org.owner?.publicRepos !== undefined;
                  const isInQueue = bulkSyncQueue.has(projectItemId);
                  const isCompleted = bulkSyncCompleted.has(projectItemId);
                  const queuePosition = bulkSyncQueueOrder.indexOf(projectItemId) + 1;
                  const queueTotal = bulkSyncQueueOrder.length;

                  const estimatedWaitSeconds =
                    isInQueue && queuePosition > 0 ? calculateEstimatedWaitTime(queuePosition, bulkSyncQueueOrder, organizations, msPerRepo) : 0;

                  return (
                    <OrganizationCard
                      key={projectItemId}
                      organization={org}
                      isSyncing={isSyncing}
                      isSyncingOwner={isSyncingOwner}
                      isSelected={isSelected}
                      canSync={canSync}
                      isBulkSyncing={isBulkSyncing}
                      isInQueue={isInQueue}
                      isCompleted={isCompleted}
                      queuePosition={isInQueue ? queuePosition : undefined}
                      queueTotal={queueTotal}
                      estimatedWaitSeconds={estimatedWaitSeconds}
                      globalFetchDetails={globalFetchDetails}
                      onSync={handleSync}
                      onSyncOwner={handleSyncOwner}
                      onToggleSelection={toggleSelection}
                    />
                  );
                  const isSyncing = syncingIds.has(org.projectItem.id.uuid);
                  return <OrganizationCard key={org.projectItem.id.uuid} organization={org} isSyncing={isSyncing} onSync={handleSync} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

interface OrganizationCardProps {
  organization: OrganizationWithSyncState;
  isSyncing: boolean;
  onSync: (projectItemId: string, offset?: number, batchSize?: number, fetchDetails?: boolean) => void;
}

function OrganizationCard({ organization, isSyncing, onSync }: OrganizationCardProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [offset, setOffset] = useState(0);
  const [batchSize, setBatchSize] = useState(500);
  const [fetchDetails, setFetchDetails] = useState(false);

  const { projectItem, owner, developers, lastSyncMessage, repository } = organization;

  return (
    <div className="p-6 hover:bg-white/5 transition-colors">
      <div className="flex items-start justify-between gap-4">
        {/* Organization Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {owner?.displayAvatarUrl && <img src={owner.displayAvatarUrl} alt={owner.id.login} className="w-12 h-12 rounded-full border-2 border-white/20" />}
            <div>
              {owner && (
                <>
                  <h3 className="text-xl font-semibold text-white">{owner.name || owner.id.login || "Unknown Organization"}</h3>
                  <ExternalLink
                    href={owner.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    @{owner.id.login}
                  </ExternalLink>
                </>
              )}
            </div>
            {owner && (
              <Badge
                variant="secondary"
                className={`ml-2 ${owner.type === dto.OwnerType.User ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}
              >
                {owner.type === dto.OwnerType.User ? (
                  <>
                    <User className="w-3 h-3 mr-1" />
                    User
                  </>
                ) : (
                  <>
                    <Building2 className="w-3 h-3 mr-1" />
                    Organization
                  </>
                )}
              </Badge>
            )}
          </div>

          {owner && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
              {owner.publicRepos !== undefined && (
                <div className="flex items-center gap-1">
                  <GitBranch className="w-4 h-4" />
                  {owner.publicRepos} public repos
                </div>
              )}
              {owner.followers !== undefined && (
                <div className="flex items-center gap-1">
                  <UserPlus className="w-4 h-4" />
                  {owner.followers.toLocaleString()} followers
                </div>
              )}
              {owner.location && <div className="flex items-center gap-1">📍 {owner.location}</div>}
              {owner.blog && (
                <div className="flex items-center gap-1">
                  🔗{" "}
                  <ExternalLink href={owner.blog} className="text-blue-400">
                    {owner.blog}
                  </ExternalLink>
                </div>
              )}
            </div>
          )}

          {/* Registered Maintainers */}
          {developers && developers.length > 0 && (
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-semibold text-purple-300">Registered Maintainers ({developers.length})</p>
              </div>
              <div className="space-y-2">
                {developers.map((dev, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded hover:bg-purple-500/20 transition-colors"
                  >
                    {/* Avatar, Name and Username */}
                    <div className="flex items-center gap-2 flex-1">
                      {dev.developerOwner.displayAvatarUrl && (
                        <img src={dev.developerOwner.displayAvatarUrl} alt={dev.developerOwner.id.login} className="w-6 h-6 rounded-full" />
                      )}
                      <div className="flex flex-col">
                        {dev.developerOwner.name && <span className="text-sm text-white font-medium">{dev.developerOwner.name}</span>}
                        <ExternalLink href={`https://github.com/${dev.developerOwner.id.login}`} className="text-xs text-purple-200 hover:text-purple-100">
                          @{dev.developerOwner.id.login}
                        </ExternalLink>
                      </div>
                    </div>

                    {/* Roles */}
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-300">
                        {dev.developerProjectItem.roles?.map(role => DeveloperRoleTypeCompanion.label(role)).join(", ") || "N/A"}
                      </span>
                    </div>

                    {/* Merge Rights */}
                    <div className="flex items-center gap-1">
                      <GitMerge className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-300">
                        {dev.developerProjectItem.mergeRights?.map(mr => MergeRightsTypeCompanion.label(mr)).join(", ") || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lastSyncMessage && (
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-300">{lastSyncMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => onSync(projectItem.id.uuid, offset, batchSize, fetchDetails)}
            disabled={isSyncing}
            className="whitespace-nowrap"
            leftIcon={isSyncing ? Loader2 : RefreshCw}
          >
            {isSyncing ? "Syncing..." : "Sync Repositories"}
          </Button>

          <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="whitespace-nowrap text-sm">
            {showAdvanced ? "Hide" : "Advanced"} Options
          </Button>
        </div>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-white font-semibold mb-3">Sync Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Offset</label>
              <Input type="number" min={0} value={offset} onChange={e => setOffset(parseInt(e.target.value) || 0)} placeholder="0" />
              <p className="text-xs text-gray-500 mt-1">Start position for pagination</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Batch Size</label>
              <Input type="number" min={1} max={500} value={batchSize} onChange={e => setBatchSize(parseInt(e.target.value) || 500)} placeholder="500" />
              <p className="text-xs text-gray-500 mt-1">Max 500 repos per sync</p>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" checked={fetchDetails} onChange={e => setFetchDetails(e.target.checked)} className="rounded" />
                Fetch Details
              </label>
              <p className="text-xs text-gray-500 mt-1">Slower but more complete data</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-300">
                <p className="font-semibold mb-1">Sync runs in background</p>
                <p>Check server logs for progress. Large organizations may take several minutes.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}