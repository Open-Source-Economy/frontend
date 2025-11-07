import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { Button } from "src/views/components/ui/forms/button";
import { Badge } from "src/views/components/ui/badge";
import { Input } from "src/views/components/ui/forms/input";
import { ExternalLink } from "src/views/components/ui/forms/ExternalLink";
import { AlertCircle, CheckCircle, Code, Eye, GitFork, Loader2, RefreshCw, Star } from "lucide-react";
import { RepositoryWithSyncState } from "./types";
import { MaintainerList } from "../../organizations/components/MaintainerList";
import { BulkSyncStatusBadge } from "../../organizations/components/BulkSyncStatusBadge";

interface RepositoryCardProps {
  repository: RepositoryWithSyncState;
  isSyncing: boolean;
  isSelected: boolean;
  canSync: boolean;
  isBulkSyncing: boolean;
  isInQueue: boolean;
  isCompleted: boolean;
  queuePosition?: number;
  queueTotal: number;
  estimatedWaitSeconds: number;
  onSync: (owner: string, repo: string) => void;
  onToggleSelection: (id: string) => void;
}

export function RepositoryCard({
  repository,
  isSyncing,
  isSelected,
  canSync,
  isBulkSyncing,
  isInQueue,
  isCompleted,
  queuePosition,
  queueTotal,
  estimatedWaitSeconds,
  onSync,
  onToggleSelection,
}: RepositoryCardProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { projectItem, repository: repo, developers, lastSyncMessage } = repository;

  const handleSync = () => {
    if (repo?.id) {
      onSync(repo.id.ownerId.login, repo.id.name);
    } else {
      alert("Repository information not available");
    }
  };

  return (
    <div
      className={`p-6 hover:bg-white/5 transition-colors ${isCompleted ? "bg-green-500/5" : isSyncing ? "bg-blue-500/5" : isInQueue ? "bg-yellow-500/5" : ""}`}
    >
      {/* Bulk Sync Status Badge */}
      {isBulkSyncing && (
        <BulkSyncStatusBadge
          isCompleted={isCompleted}
          isSyncing={isSyncing}
          isInQueue={isInQueue}
          queuePosition={queuePosition}
          queueTotal={queueTotal}
          estimatedWaitSeconds={estimatedWaitSeconds}
        />
      )}

      <div className="flex items-start justify-between gap-4">
        {/* Selection Checkbox */}
        <div className="flex items-start pt-1">
          {canSync ? (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelection(projectItem.id.uuid)}
              disabled={isBulkSyncing}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer disabled:opacity-50"
            />
          ) : (
            <div
              className="w-5 h-5 rounded border-2 border-red-500 bg-red-500/10 flex items-center justify-center"
              title="Cannot sync: repository data unavailable"
            >
              <AlertCircle className="w-3 h-3 text-red-400" />
            </div>
          )}
        </div>

        {/* Repository Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div>
              {repo && (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-white">{repo.fullName || repo.id.name}</h3>
                    {repo.fork && (
                      <Badge variant="secondary" className="bg-gray-500/20 text-gray-300">
                        <GitFork className="w-3 h-3 mr-1" />
                        Fork
                      </Badge>
                    )}
                    {repo.visibility && (
                      <Badge variant="secondary" className={repo.visibility === "private" ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}>
                        {repo.visibility}
                      </Badge>
                    )}
                  </div>
                  <ExternalLink
                    href={repo.htmlUrl || `https://github.com/${repo.id.ownerId.login}/${repo.id.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {repo.id.ownerId.login}/{repo.id.name}
                  </ExternalLink>
                </>
              )}
            </div>
          </div>

          {repo && repo.description && <p className="text-sm text-gray-400 mt-2">{repo.description}</p>}

          {repo && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
              {repo.stargazersCount !== undefined && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {repo.stargazersCount.toLocaleString()} stars
                </div>
              )}
              {repo.forksCount !== undefined && (
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {repo.forksCount.toLocaleString()} forks
                </div>
              )}
              {repo.watchersCount !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {repo.watchersCount.toLocaleString()} watchers
                </div>
              )}
              {repo.language && (
                <div className="flex items-center gap-1">
                  <Code className="w-4 h-4" />
                  {repo.language}
                </div>
              )}
            </div>
          )}

          {repo && repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {repo.topics.map((topic, idx) => (
                <Badge key={idx} variant="secondary" className="bg-blue-500/10 text-blue-300 text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          {repo && repo.homepage && (
            <div className="mt-3 text-sm">
              🔗{" "}
              <ExternalLink href={repo.homepage} className="text-blue-400">
                {repo.homepage}
              </ExternalLink>
            </div>
          )}

          {/* Warning for non-syncable repositories */}
          {!canSync && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-300">
                <strong>Cannot sync:</strong> Repository data is not available. The repository may need to be added to the database first.
              </div>
            </div>
          )}

          {/* Registered Maintainers */}
          {developers && <MaintainerList developers={developers} />}

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
            onClick={handleSync}
            disabled={!canSync || isSyncing || isBulkSyncing}
            className="whitespace-nowrap"
            leftIcon={isSyncing ? Loader2 : RefreshCw}
          >
            {isSyncing ? "Syncing..." : "Sync Repository"}
          </Button>

          {canSync && (
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="whitespace-nowrap text-sm">
              {showAdvanced ? "Hide" : "Show"} Details
            </Button>
          )}
        </div>
      </div>

      {/* Details Panel */}
      {showAdvanced && canSync && repo && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-white font-semibold mb-3">Repository Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {repo.openIssuesCount !== undefined && (
              <div>
                <span className="text-gray-400">Open Issues:</span> <span className="text-white ml-2">{repo.openIssuesCount}</span>
              </div>
            )}
            {repo.subscribersCount !== undefined && (
              <div>
                <span className="text-gray-400">Subscribers:</span> <span className="text-white ml-2">{repo.subscribersCount}</span>
              </div>
            )}
            {repo.networkCount !== undefined && (
              <div>
                <span className="text-gray-400">Network:</span> <span className="text-white ml-2">{repo.networkCount}</span>
              </div>
            )}
            {repo.id.githubId && (
              <div>
                <span className="text-gray-400">GitHub ID:</span> <span className="text-white ml-2">{repo.id.githubId}</span>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-300">
                <p className="font-semibold mb-1">Sync updates repository data</p>
                <p>Syncing fetches the latest repository information from GitHub, including stars, forks, and other metadata.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
