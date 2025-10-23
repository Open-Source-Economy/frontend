import React from "react";
import { AlertCircle, Code, RefreshCw, X } from "lucide-react";
import { ApiError } from "src/ultils/error/ApiError";
import { config, Env } from "src/ultils";

export interface ServerErrorAlertProps {
  /** Error object to display - accepts ApiError or string for backwards compatibility */
  error?: ApiError | string;
  /** @deprecated Use error prop instead. Error message to display */
  message?: string;
  /** Optional error title - defaults based on error status or "Internal Server Error" */
  title?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry button text - defaults to "Try Again" */
  retryText?: string;
  /** Callback when retry is clicked */
  onRetry?: () => void;
  /** Show dismiss button */
  showDismiss?: boolean;
  /** Callback when dismiss is clicked */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Variant of the error alert */
  variant?: "default" | "compact" | "detailed";
}

// -----------------------------
// Helpers
// -----------------------------
function toApiError(err?: ApiError | string, legacyMessage?: string): ApiError {
  if (err instanceof ApiError) return err;
  if (typeof err === "string") return new ApiError(undefined, undefined, err);
  return new ApiError(undefined, undefined, legacyMessage || "An unexpected error occurred. Please try again later.");
}

function getDisplayCopy(errorObj: ApiError, explicitTitle?: string) {
  const title = explicitTitle || errorObj.statusText || "Internal Server Error";
  const message = config.env == Env.Production ? "An unexpected error occurred. Please try again later." : errorObj.message;
  const showStatusCode = config.env != Env.Production && (!!errorObj.statusCode || !!errorObj.statusText);
  const showStackTrace = config.env != Env.Production && Boolean(errorObj.stack);
  return { title, message, showStatusCode, showStackTrace };
}

// Consolidate shared container + overlay classes so variants are lighter
const baseContainer = (extra = "") =>
  `relative overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1625] via-[#1c1628] to-[#1a1625] border border-brand-error/30 ${extra}`;

const overlays = {
  default: "absolute inset-0 bg-gradient-to-br from-brand-error/6 via-transparent to-brand-error/6 pointer-events-none",
  compact: "absolute inset-0 bg-gradient-to-br from-brand-error/5 via-transparent to-brand-error/5 pointer-events-none",
  detailed: "absolute inset-0 bg-gradient-to-br from-brand-error/8 via-transparent to-brand-error/8 pointer-events-none",
} as const;

// -----------------------------
// Variant pieces
// -----------------------------
function StatusBadge({ code }: { code?: number }) {
  if (!code) return null;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-error/15 border border-brand-error/30 text-xs font-medium text-brand-error/60">
      Error {code}
    </span>
  );
}

function DismissBtn({ onClick, size = "md" }: { onClick: () => void; size?: "sm" | "md" }) {
  const dims = size === "sm" ? "w-6 h-6 rounded-md" : "w-8 h-8 rounded-lg";
  return (
    <button
      onClick={onClick}
      className={`${dims} flex items-center justify-center text-brand-error/60 hover:text-brand-error hover:bg-brand-error/10 transition-all duration-200 group`}
      aria-label="Dismiss error"
    >
      <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
    </button>
  );
}

// -----------------------------
// Main component
// -----------------------------
export const ServerErrorAlert: React.FC<ServerErrorAlertProps> = ({
  error,
  message,
  title,
  showRetry = false,
  retryText = "Try Again",
  onRetry,
  showDismiss = false,
  onDismiss,
  className = "",
  variant = "default",
}) => {
  const errorObj = React.useMemo(() => toApiError(error, message), [error, message]);
  const {
    title: displayTitle,
    message: displayMessage,
    showStatusCode,
    showStackTrace,
  } = React.useMemo(() => getDisplayCopy(errorObj, title), [errorObj, title]);

  if (variant === "compact") {
    return (
      <div className={`${baseContainer("shadow-lg shadow-brand-error/10")} ${className}`}>
        <div className={overlays.compact} />
        <div className="relative px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-md bg-brand-error/15 border border-brand-error/30 flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 text-brand-error" />
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="text-base font-semibold text-brand-error leading-snug">{displayTitle}</h4>
                {showStatusCode && errorObj.statusCode && (
                  <div>
                    <span className="text-xs text-brand-error/60 font-medium">Error {errorObj.statusCode}</span>
                  </div>
                )}
                <p className="text-xs text-brand-error/80 leading-relaxed">{displayMessage}</p>
              </div>
            </div>
            {showDismiss && onDismiss && <DismissBtn onClick={onDismiss} size="sm" />}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`${baseContainer("rounded-xl shadow-2xl shadow-brand-error/10")} ${className}`}>
        <div className={overlays.detailed} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-error to-transparent opacity-50" />

        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-error/20 to-brand-error/10 border border-brand-error/30 flex items-center justify-center shadow-lg shadow-brand-error/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-error/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <AlertCircle className="w-6 h-6 text-brand-error relative z-10" />
              </div>
            </div>

            <div className="flex-1 space-y-4 min-w-0">
              <div className="space-y-2">
                {showStatusCode && errorObj.statusCode && (
                  <div>
                    <StatusBadge code={errorObj.statusCode} />
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-brand-error leading-tight">{displayTitle}</h3>
                <p className="text-sm text-brand-error/80 leading-relaxed">{displayMessage}</p>
              </div>

              {showStackTrace && (
                <div className="p-4 rounded-lg bg-brand-neutral-50/50 backdrop-blur-sm border border-brand-error/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-brand-error/15 flex items-center justify-center">
                      <Code className="w-3.5 h-3.5 text-brand-error/70" />
                    </div>
                    <span className="text-xs font-semibold text-brand-error/70 uppercase tracking-wider">Stack Trace (Dev Only)</span>
                  </div>
                  <pre className="text-xs text-brand-neutral-600 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed p-3 rounded-md bg-brand-neutral-100/50">
                    {errorObj.stack}
                  </pre>
                </div>
              )}

              {(showRetry || showDismiss) && (
                <div className="flex items-center gap-3 pt-2">
                  {showRetry && onRetry && (
                    <button
                      onClick={onRetry}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-error/15 hover:bg-brand-error/25 border border-brand-error/40 hover:border-brand-error/60 text-sm font-medium text-brand-error transition-all duration-200 shadow-lg shadow-brand-error/10 hover:shadow-brand-error/20 group"
                    >
                      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      {retryText}
                    </button>
                  )}
                  {showDismiss && onDismiss && (
                    <button
                      onClick={onDismiss}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-brand-error/70 hover:text-brand-error hover:bg-brand-error/10 transition-all duration-200"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              )}
            </div>

            {showDismiss && onDismiss && !showRetry && <DismissBtn onClick={onDismiss} />}
          </div>
        </div>
      </div>
    );
  }

  // default
  return (
    <div className={`${baseContainer("shadow-xl shadow-brand-error/10")} ${className}`}>
      <div className={overlays.default} />
      <div className="relative p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-lg bg-brand-error/15 border border-brand-error/30 flex items-center justify-center shadow-md shadow-brand-error/10">
                <AlertCircle className="w-4.5 h-4.5 text-brand-error" />
              </div>
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              {showStatusCode && errorObj.statusCode && (
                <div>
                  <span className="text-xs text-brand-error/60 font-medium">
                    Error {errorObj.statusCode}
                    {errorObj.statusText ? ` - ${errorObj.statusText}` : ""}
                  </span>
                </div>
              )}
              <h4 className="text-lg font-semibold text-brand-error leading-snug">{displayTitle}</h4>
              <p className="text-sm text-brand-error/80 leading-relaxed">{displayMessage}</p>

              {showRetry && onRetry && (
                <div className="pt-1">
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-error/15 hover:bg-brand-error/25 border border-brand-error/40 hover:border-brand-error/60 text-xs font-medium text-brand-error transition-all duration-200 shadow-md shadow-brand-error/10 hover:shadow-brand-error/20 group"
                  >
                    <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    {retryText}
                  </button>
                </div>
              )}
            </div>
          </div>

          {showDismiss && onDismiss && <DismissBtn onClick={onDismiss} size="sm" />}
        </div>
      </div>
    </div>
  );
};
