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

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatisticCard icon={Building2} iconColor="text-blue-400" value={organizations.length} label="Total Owners" />
            <StatisticCard icon={Users} iconColor="text-purple-400" value={stats.totalMaintainers} label="Unique Maintainers" />
            <StatisticCard icon={GitBranch} iconColor="text-green-400" value={filteredOrganizations.length} label="Filtered Results" />
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
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
