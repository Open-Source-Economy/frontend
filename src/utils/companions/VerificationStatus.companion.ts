import { VerificationStatus } from "@open-source-economy/api-types";

export namespace VerificationStatusCompanion {
  export function label(status: VerificationStatus): string {
    switch (status) {
      case VerificationStatus.PENDING_REVIEW:
        return "Pending Review";
      case VerificationStatus.UNDER_REVIEW:
        return "Under Review";
      case VerificationStatus.INFORMATION_REQUESTED:
        return "Information Requested";
      case VerificationStatus.CHANGES_REQUESTED:
        return "Changes Requested";
      case VerificationStatus.APPROVED:
        return "Approved";
      case VerificationStatus.REJECTED:
        return "Rejected";
      default:
        return "Unknown";
    }
  }

  export function variant(status: VerificationStatus): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case VerificationStatus.PENDING_REVIEW:
        return "outline";
      case VerificationStatus.UNDER_REVIEW:
        return "secondary";
      case VerificationStatus.INFORMATION_REQUESTED:
        return "outline";
      case VerificationStatus.CHANGES_REQUESTED:
        return "destructive";
      case VerificationStatus.APPROVED:
        return "default"; // Will be styled as success via custom class
      case VerificationStatus.REJECTED:
        return "destructive";
      default:
        return "default";
    }
  }

  export function description(status: VerificationStatus): string {
    switch (status) {
      case VerificationStatus.PENDING_REVIEW:
        return "Awaiting admin review";
      case VerificationStatus.UNDER_REVIEW:
        return "Admin is reviewing";
      case VerificationStatus.INFORMATION_REQUESTED:
        return "Admin needs more information";
      case VerificationStatus.CHANGES_REQUESTED:
        return "Admin found issues to fix";
      case VerificationStatus.APPROVED:
        return "Verified and approved";
      case VerificationStatus.REJECTED:
        return "Does not meet criteria";
      default:
        return "";
    }
  }

  export function needsAction(status: VerificationStatus): boolean {
    return status !== VerificationStatus.APPROVED;
  }

  export function selectOptions() {
    return [
      { value: VerificationStatus.PENDING_REVIEW, label: label(VerificationStatus.PENDING_REVIEW) },
      { value: VerificationStatus.UNDER_REVIEW, label: label(VerificationStatus.UNDER_REVIEW) },
      { value: VerificationStatus.INFORMATION_REQUESTED, label: label(VerificationStatus.INFORMATION_REQUESTED) },
      { value: VerificationStatus.CHANGES_REQUESTED, label: label(VerificationStatus.CHANGES_REQUESTED) },
      { value: VerificationStatus.APPROVED, label: label(VerificationStatus.APPROVED) },
      { value: VerificationStatus.REJECTED, label: label(VerificationStatus.REJECTED) },
    ];
  }
}
