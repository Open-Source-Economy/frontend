import React, { useState } from "react";
import { Button } from "src/views/components/ui/forms/button";
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from "lucide-react";
import { adminHooks } from "src/api";
import { ApiError } from "src/ultils/error/ApiError";

interface OrganizationSyncButtonProps {
  projectItemId: string;
  organizationLogin: string;
  variant?: "default" | "outline" | "ghost";
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  className?: string;
}

export function OrganizationSyncButton(props: OrganizationSyncButtonProps) {
  const variant = props.variant ?? "outline";
  const size = props.size ?? "sm";
  const className = props.className ?? "";

  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const syncOrgRepos = adminHooks.useSyncOrganizationRepositoriesMutation();

  const handleSync = async () => {
    setSyncStatus("idle");
    setMessage("");

    try {
      const response = await syncOrgRepos.mutateAsync({
        params: { projectItemId: props.projectItemId },
        query: { offset: 0 }, // Start from beginning
      });

      setSyncStatus("success");
      setMessage(response.message);
    } catch (error) {
      setSyncStatus("error");
      setMessage(error instanceof ApiError ? error.message : error instanceof Error ? error.message : "Sync failed");
    } finally {
      // Clear status after 5 seconds
      setTimeout(() => {
        setSyncStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  const getIconComponent = () => {
    if (syncOrgRepos.isPending) return Loader2;
    if (syncStatus === "success") return CheckCircle;
    if (syncStatus === "error") return AlertCircle;
    return RefreshCw;
  };

  const getButtonVariant = () => {
    if (syncStatus === "success") return "default";
    if (syncStatus === "error") return "destructive";
    return variant;
  };

  const getButtonText = () => {
    if (syncOrgRepos.isPending) return "Syncing...";
    if (syncStatus === "success") return "Synced!";
    if (syncStatus === "error") return "Failed";
    return "Sync Repos";
  };

  return (
    <div className={className}>
      <Button
        onClick={handleSync}
        disabled={syncOrgRepos.isPending}
        variant={getButtonVariant()}
        size={size}
        className="whitespace-nowrap"
        leftIcon={getIconComponent()}
      >
        {getButtonText()}
      </Button>

      {message && (
        <p className={`text-xs mt-2 ${syncStatus === "success" ? "text-green-400" : syncStatus === "error" ? "text-red-400" : "text-gray-400"}`}>{message}</p>
      )}
    </div>
  );
}
