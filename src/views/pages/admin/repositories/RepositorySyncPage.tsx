import React, { useEffect, useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils";
import { Code, GitBranch, Users } from "lucide-react";
import { getBackendAPI } from "src/services/BackendAPI";
import { ProjectItemWithDetailsCompanion } from "src/ultils/companions";
import { RepositoryWithSyncState } from "./components/types";
import { RepositoryCard } from "./components/RepositoryCard";
import { BulkSyncControls } from "../organizations/components/BulkSyncControls";
import { StatisticCard } from "../organizations/components/StatisticCard";

export function RepositorySyncPage() {
  const [repositories, setRepositories] = useState<RepositoryWithSyncState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);
  const [bulkSyncProgress, setBulkSyncProgress] = useState<{ current: number; total: number } | null>(null);
  const [bulkSyncQueue, setBulkSyncQueue] = useState<Set<string>>(new Set());
  const [bulkSyncCompleted, setBulkSyncCompleted] = useState<Set<string>>(new Set());
  const [bulkSyncQueueOrder, setBulkSyncQueueOrder] = useState<string[]>([]);
  const [msPerRepo, setMsPerRepo] = useState<number>(2000); // 2 seconds per repo for safety
  const [globalFetchDetails, setGlobalFetchDetails] = useState(true);

  const adminAPI = getAdminBackendAPI();
  const backendAPI = getBackendAPI();

  // Fetch all project items and filter repositories
  const fetchRepositories = async () => {
    try {
      const apiCall = async () => {
        return await backendAPI.getProjectItemsWithDetails(
          {},
          {
            repositories: {}, // Fetch all GITHUB_REPOSITORY type project items
            owners: { limit: 0 },
            urls: { limit: 0 },
          },
        );
      };

      const onSuccess = (response: dto.GetProjectItemsWithDetailsResponse) => {
        if (!response || !response.repositories) {
          console.warn("No repositories in response");
          setRepositories([]);
          return;
        }

        if (!Array.isArray(response.repositories)) {
          console.error("response.repositories is not an array:", response.repositories);
          setRepositories([]);
          return;
        }

        const repos: RepositoryWithSyncState[] = response.repositories.map(item => ({
          ...item,
          syncInProgress: false,
        }));
        setRepositories(repos);
      };

      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    } catch (error) {
      console.error("Error in fetchRepositories:", error);
      setApiError(ApiError.from(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const handleSync = async (owner: string, repo: string, projectItemId: string) => {
    setSyncingIds(prev => new Set(prev).add(projectItemId));

    const apiCall = async () => {
      return await adminAPI.syncRepository({ owner, repo }, {}, {});
    };

    const onSuccess = (response: dto.SyncRepositoryResponse) => {
      const successData = response;
      setRepositories(prev =>
        prev.map(r =>
          r.projectItem.id.uuid === projectItemId ? { ...r, repository: successData.repository, lastSyncMessage: "Repository synced successfully" } : r,
        ),
      );

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

  const handleBulkSync = async () => {
    const selectedRepos = repositories.filter(repo => selectedIds.has(repo.projectItem.id.uuid));

    if (selectedRepos.length === 0) {
      alert("Please select at least one repository to sync");
      return;
    }

    const invalidRepos = selectedRepos.filter(repo => !repo.repository?.id);
    if (invalidRepos.length > 0) {
      alert(`Cannot sync: ${invalidRepos.length} repositor${invalidRepos.length > 1 ? "ies" : "y"} don't have valid data`);
      return;
    }

    setIsBulkSyncing(true);
    setBulkSyncProgress({ current: 0, total: selectedRepos.length });
    setBulkSyncCompleted(new Set());

    const queueOrder = selectedRepos.map(repo => repo.projectItem.id.uuid);
    setBulkSyncQueueOrder(queueOrder);
    setBulkSyncQueue(new Set(queueOrder));

    for (let i = 0; i < selectedRepos.length; i++) {
      const repo = selectedRepos[i];
      const projectItemId = repo.projectItem.id.uuid;

      setBulkSyncQueue(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectItemId);
        return newSet;
      });

      setBulkSyncProgress({ current: i + 1, total: selectedRepos.length });

      if (repo.repository?.id) {
        await handleSync(repo.repository.id.ownerId.login, repo.repository.id.name, projectItemId);
      }

      setBulkSyncCompleted(prev => new Set(prev).add(projectItemId));

      if (i < selectedRepos.length - 1) {
        console.log(`Waiting ${msPerRepo}ms before next sync...`);
        await new Promise(resolve => setTimeout(resolve, msPerRepo));
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
    const syncableRepos = filteredRepositories.filter(repo => repo.repository?.id);
    if (selectedIds.size === syncableRepos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(syncableRepos.map(repo => repo.projectItem.id.uuid)));
    }
  };

  const filteredRepositories = repositories.filter(repo => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const name = repo.repository?.id.name?.toLowerCase() || "";
    const fullName = repo.repository?.fullName?.toLowerCase() || "";
    const description = repo.repository?.description?.toLowerCase() || "";
    const owner = repo.repository?.id.ownerId.login?.toLowerCase() || "";
    return name.includes(searchLower) || fullName.includes(searchLower) || description.includes(searchLower) || owner.includes(searchLower);
  });

  const stats = React.useMemo(() => {
    return ProjectItemWithDetailsCompanion.getProjectItemsStats(repositories);
  }, [repositories]);

  const syncableCount = filteredRepositories.filter(repo => repo.repository?.id).length;

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#14233A] flex items-center justify-center">
          <LoadingState message="Loading repositories..." variant="spinner" size="lg" />
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
            <h1 className="text-3xl font-bold text-white mb-2">Repository Sync</h1>
            <p className="text-gray-400">Sync individual GitHub repositories to update their metadata and information.</p>
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
            <StatisticCard icon={Code} iconColor="text-blue-400" value={repositories.length} label="Total Repositories" />
            <StatisticCard icon={Users} iconColor="text-purple-400" value={stats.totalMaintainers} label="Unique Maintainers" />
            <StatisticCard icon={GitBranch} iconColor="text-green-400" value={filteredRepositories.length} label="Filtered Results" />
          </div>

          {/* Repositories List */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            {filteredRepositories.length === 0 ? (
              <div className="p-12 text-center">
                <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No repositories found</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredRepositories.map(repo => {
                  const projectItemId = repo.projectItem.id.uuid;
                  const isSyncing = syncingIds.has(projectItemId);
                  const isSelected = selectedIds.has(projectItemId);
                  const canSync = !!repo.repository?.id;
                  const isInQueue = bulkSyncQueue.has(projectItemId);
                  const isCompleted = bulkSyncCompleted.has(projectItemId);
                  const queuePosition = bulkSyncQueueOrder.indexOf(projectItemId) + 1;
                  const queueTotal = bulkSyncQueueOrder.length;

                  // For repositories, we use a fixed wait time per repo
                  const estimatedWaitSeconds = isInQueue && queuePosition > 0 ? ((queuePosition - 1) * msPerRepo) / 1000 : 0;

                  return (
                    <RepositoryCard
                      key={projectItemId}
                      repository={repo}
                      isSyncing={isSyncing}
                      isSelected={isSelected}
                      canSync={canSync}
                      isBulkSyncing={isBulkSyncing}
                      isInQueue={isInQueue}
                      isCompleted={isCompleted}
                      queuePosition={isInQueue ? queuePosition : undefined}
                      queueTotal={queueTotal}
                      estimatedWaitSeconds={estimatedWaitSeconds}
                      onSync={(owner, repoName) => handleSync(owner, repoName, projectItemId)}
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
