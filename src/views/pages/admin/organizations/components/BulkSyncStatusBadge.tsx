import React from "react";
import { CheckCircle, Loader2, RefreshCw } from "lucide-react";
import { BulkSyncStatus } from "./types";
import { formatWaitTime } from "./utils";

interface BulkSyncStatusBadgeProps {
  isCompleted: boolean;
  isSyncing: boolean;
  isInQueue: boolean;
  queuePosition?: number;
  queueTotal: number;
  estimatedWaitSeconds: number;
}

export function BulkSyncStatusBadge(props: BulkSyncStatusBadgeProps) {
  const getBulkSyncStatus = (): BulkSyncStatus | null => {
    if (props.isCompleted) {
      return {
        text: "Completed",
        bgColor: "bg-green-500/20",
        textColor: "text-green-300",
        borderColor: "border-green-500/30",
        icon: CheckCircle,
      };
    }
    if (props.isSyncing) {
      return {
        text: "Syncing...",
        bgColor: "bg-blue-500/20",
        textColor: "text-blue-300",
        borderColor: "border-blue-500/30",
        icon: Loader2,
      };
    }
    if (props.isInQueue && props.queuePosition) {
      const waitTimeText = props.estimatedWaitSeconds > 0 ? ` - ~${formatWaitTime(props.estimatedWaitSeconds)}` : "";

      return {
        text: `Pending (${props.queuePosition}/${props.queueTotal})${waitTimeText}`,
        bgColor: "bg-yellow-500/20",
        textColor: "text-yellow-300",
        borderColor: "border-yellow-500/30",
        icon: RefreshCw,
      };
    }
    return null;
  };

  const status = getBulkSyncStatus();

  if (!status) {
    return null;
  }

  return (
    <div className={`mb-3 p-2 rounded-lg border ${status.borderColor} ${status.bgColor} flex items-center gap-2`}>
      {status.icon === Loader2 ? (
        <Loader2 className={`w-4 h-4 ${status.textColor} animate-spin`} />
      ) : (
        <status.icon className={`w-4 h-4 ${status.textColor}`} />
      )}
      <span className={`text-sm font-semibold ${status.textColor}`}>{status.text}</span>
    </div>
  );
}
