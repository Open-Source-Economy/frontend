import React from "react";
import { Button } from "src/views/components/ui/forms/button";
import { Input } from "src/views/components/ui/forms/inputs/input";
import { Building2, Loader2, RefreshCw } from "lucide-react";

interface BulkSyncControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  msPerRepo: number;
  onMsPerRepoChange: (value: number) => void;
  globalFetchDetails: boolean;
  onGlobalFetchDetailsChange: (value: boolean) => void;
  isBulkSyncing: boolean;
  syncableCount: number;
  selectedCount: number;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
  onBulkSync: () => void;
  bulkSyncProgress?: { current: number; total: number } | null;
}

export function BulkSyncControls(props: BulkSyncControlsProps) {
  return (
    <div className="mb-6 flex gap-4 items-center flex-wrap">
      <Input
        type="text"
        placeholder="Search organizations and users..."
        value={props.searchTerm}
        onChange={e => props.onSearchChange(e.target.value)}
        className="max-w-md"
        leftIcon={Building2}
      />

      <div className="flex gap-2 items-center ml-auto flex-wrap">
        {/* Wait time configuration */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400 whitespace-nowrap">Wait time per repo:</label>
          <Input
            type="number"
            min={100}
            max={10000}
            step={100}
            value={props.msPerRepo}
            onChange={e => props.onMsPerRepoChange(parseInt(e.target.value) || 1000)}
            className="w-24"
            disabled={props.isBulkSyncing}
          />
          <span className="text-sm text-gray-400">ms</span>
        </div>

        {/* Global Fetch Details toggle */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
          <input
            type="checkbox"
            id="global-fetch-details"
            checked={props.globalFetchDetails}
            onChange={e => props.onGlobalFetchDetailsChange(e.target.checked)}
            disabled={props.isBulkSyncing}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <label htmlFor="global-fetch-details" className="text-sm text-gray-300 whitespace-nowrap cursor-pointer">
            Fetch Details
          </label>
        </div>

        <Button variant="outline" size="sm" onClick={props.onToggleSelectAll} disabled={props.isBulkSyncing || props.syncableCount === 0}>
          {props.isAllSelected && props.syncableCount > 0 ? "Deselect All" : "Select All"}
        </Button>

        <Button onClick={props.onBulkSync} disabled={props.selectedCount === 0 || props.isBulkSyncing} className="bg-green-600 hover:bg-green-700">
          {props.isBulkSyncing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Syncing {props.bulkSyncProgress?.current}/{props.bulkSyncProgress?.total}
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Selected ({props.selectedCount})
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
