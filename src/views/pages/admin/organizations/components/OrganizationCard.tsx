import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { Button } from "src/views/components/ui/forms/button";
import { Badge } from "src/views/components/ui/badge";
import { Input } from "src/views/components/ui/forms/input";
import { ExternalLink } from "src/views/components/ui/forms/ExternalLink";
import { AlertCircle, Building2, CheckCircle, GitBranch, Loader2, RefreshCw, User, UserPlus } from "lucide-react";
import { OrganizationWithSyncState } from "./types";
import { MaintainerList } from "./MaintainerList";
import { BulkSyncStatusBadge } from "./BulkSyncStatusBadge";

interface OrganizationCardProps {
  organization: OrganizationWithSyncState;
  isSyncing: boolean;
  isSyncingOwner: boolean;
  isSelected: boolean;
  canSync: boolean;
  isBulkSyncing: boolean;
  isInQueue: boolean;
  isCompleted: boolean;
  queuePosition?: number;
  queueTotal: number;
  estimatedWaitSeconds: number;
  globalFetchDetails: boolean;
  onSync: (projectItemId: string, offset?: number, batchSize?: number, fetchDetails?: boolean) => void;
  onSyncOwner: (ownerLogin: string, projectItemId: string) => void;
  onToggleSelection: (id: string) => void;
}

export function OrganizationCard({
  organization,
  isSyncing,
  isSyncingOwner,
  isSelected,
  canSync,
  isBulkSyncing,
  isInQueue,
  isCompleted,
  queuePosition,
  queueTotal,
  estimatedWaitSeconds,
  globalFetchDetails,
  onSync,
  onSyncOwner,
  onToggleSelection,
}: OrganizationCardProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [offset, setOffset] = useState(0);
  const [batchSize, setBatchSize] = useState(500);
  const [fetchDetails, setFetchDetails] = useState(globalFetchDetails);

  // Sync local fetchDetails with global setting when it changes
  React.useEffect(() => {
    setFetchDetails(globalFetchDetails);
  }, [globalFetchDetails]);

  const { projectItem, owner, developers, lastSyncMessage } = organization;

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
              title="Cannot sync: public repo count unavailable"
            >
              <AlertCircle className="w-3 h-3 text-red-400" />
            </div>
          )}
        </div>

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

          {/* Warning for non-syncable owners */}
          {!canSync && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-300">
                <strong>Cannot sync:</strong> Public repository count is not available. Please sync this owner's data first to enable bulk sync.
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
          {/* Sync Owner Data - Always visible */}
          <Button
            onClick={() => {
              // Get login from sourceIdentifier (OwnerId)
              const sourceId = projectItem.sourceIdentifier;

              // Check if sourceIdentifier is an object with login property
              if (sourceId && typeof sourceId === "object" && "login" in sourceId) {
                const ownerId = sourceId as dto.OwnerId;
                onSyncOwner(ownerId.login, projectItem.id.uuid);
              } else {
                alert("Unable to sync: owner login not found in project item");
              }
            }}
            disabled={isSyncingOwner}
            variant="outline"
            className="whitespace-nowrap"
            leftIcon={isSyncingOwner ? Loader2 : RefreshCw}
          >
            {isSyncingOwner ? "Syncing..." : "Sync Owner Data"}
          </Button>

          {/* Sync Repositories - Only visible when publicRepos is available */}
          {canSync && (
            <>
              <Button
                onClick={() => onSync(projectItem.id.uuid, offset, batchSize, fetchDetails)}
                disabled={isSyncing || isBulkSyncing || isSyncingOwner}
                className="whitespace-nowrap"
                leftIcon={isSyncing ? Loader2 : RefreshCw}
              >
                {isSyncing ? "Syncing..." : "Sync Repositories"}
              </Button>

              <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="whitespace-nowrap text-sm">
                {showAdvanced ? "Hide" : "Advanced"} Options
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Advanced Options */}
      {showAdvanced && canSync && (
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
