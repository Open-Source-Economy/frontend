import React, { useState } from "react";
import { Button } from "src/views/components/ui/forms/button";
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from "lucide-react";
import { getAdminBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";

interface OrganizationSyncButtonProps {
  projectItemId: string;
  organizationLogin: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function OrganizationSyncButton({ projectItemId, organizationLogin, variant = "outline", size = "sm", className = "" }: OrganizationSyncButtonProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const adminAPI = getAdminBackendAPI();

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus("idle");
    setMessage("");

    try {
      const response = await adminAPI.syncOrganizationRepositories(
        { projectItemId },
        { offset: 0 }, // Start from beginning
      );

      if (response instanceof ApiError) {
        setSyncStatus("error");
        setMessage(response.message);
      } else {
        setSyncStatus("success");
        setMessage(response.message);
      }
    } catch (error) {
      setSyncStatus("error");
      setMessage(error instanceof Error ? error.message : "Sync failed");
    } finally {
      setIsSyncing(false);
      // Clear status after 5 seconds
      setTimeout(() => {
        setSyncStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  const getIconComponent = () => {
    if (isSyncing) return Loader2;
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
    if (isSyncing) return "Syncing...";
    if (syncStatus === "success") return "Synced!";
    if (syncStatus === "error") return "Failed";
    return "Sync Repos";
  };

  return (
    <div className={className}>
      <Button onClick={handleSync} disabled={isSyncing} variant={getButtonVariant()} size={size} className="whitespace-nowrap" leftIcon={getIconComponent()}>
        {getButtonText()}
      </Button>

      {message && (
        <p className={`text-xs mt-2 ${syncStatus === "success" ? "text-green-400" : syncStatus === "error" ? "text-red-400" : "text-gray-400"}`}>{message}</p>
      )}
    </div>
  );
}
