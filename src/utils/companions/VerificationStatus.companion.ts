import * as dto from "@open-source-economy/api-types";

export namespace VerificationStatusCompanion {
  export function label(status: dto.VerificationStatus): string {
    switch (status) {
      case dto.VerificationStatus.PENDING_REVIEW:
        return "Pending Review";
      case dto.VerificationStatus.UNDER_REVIEW:
        return "Under Review";
      case dto.VerificationStatus.INFORMATION_REQUESTED:
        return "Information Requested";
      case dto.VerificationStatus.CHANGES_REQUESTED:
        return "Changes Requested";
      case dto.VerificationStatus.APPROVED:
        return "Approved";
      case dto.VerificationStatus.REJECTED:
        return "Rejected";
      default:
        return "Unknown";
    }
  }

  export function variant(status: dto.VerificationStatus): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case dto.VerificationStatus.PENDING_REVIEW:
        return "outline";
      case dto.VerificationStatus.UNDER_REVIEW:
        return "secondary";
      case dto.VerificationStatus.INFORMATION_REQUESTED:
        return "outline";
      case dto.VerificationStatus.CHANGES_REQUESTED:
        return "destructive";
      case dto.VerificationStatus.APPROVED:
        return "default"; // Will be styled as success via custom class
      case dto.VerificationStatus.REJECTED:
        return "destructive";
      default:
        return "default";
    }
  }

  export function description(status: dto.VerificationStatus): string {
    switch (status) {
      case dto.VerificationStatus.PENDING_REVIEW:
        return "Awaiting admin review";
      case dto.VerificationStatus.UNDER_REVIEW:
        return "Admin is reviewing";
      case dto.VerificationStatus.INFORMATION_REQUESTED:
        return "Admin needs more information";
      case dto.VerificationStatus.CHANGES_REQUESTED:
        return "Admin found issues to fix";
      case dto.VerificationStatus.APPROVED:
        return "Verified and approved";
      case dto.VerificationStatus.REJECTED:
        return "Does not meet criteria";
      default:
        return "";
    }
  }

  export function needsAction(status: dto.VerificationStatus): boolean {
    return status !== dto.VerificationStatus.APPROVED;
  }

  export function selectOptions() {
    return [
      { value: dto.VerificationStatus.PENDING_REVIEW, label: label(dto.VerificationStatus.PENDING_REVIEW) },
      { value: dto.VerificationStatus.UNDER_REVIEW, label: label(dto.VerificationStatus.UNDER_REVIEW) },
      {
        value: dto.VerificationStatus.INFORMATION_REQUESTED,
        label: label(dto.VerificationStatus.INFORMATION_REQUESTED),
      },
      { value: dto.VerificationStatus.CHANGES_REQUESTED, label: label(dto.VerificationStatus.CHANGES_REQUESTED) },
      { value: dto.VerificationStatus.APPROVED, label: label(dto.VerificationStatus.APPROVED) },
      { value: dto.VerificationStatus.REJECTED, label: label(dto.VerificationStatus.REJECTED) },
    ];
  }
}
