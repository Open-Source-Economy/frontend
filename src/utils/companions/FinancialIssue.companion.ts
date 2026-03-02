import * as dto from "@open-source-economy/api-types";

/**
 * Companion utilities for FinancialIssue, replacing the removed financialIssueUtils from api-types.
 */
export namespace FinancialIssueCompanion {
  /**
   * Returns a unique string identifier for a financial issue based on its issue id.
   */
  export function id(fi: dto.FinancialIssue): string {
    return `${fi.issue.id.repositoryId.ownerId}/${fi.issue.id.repositoryId.name}#${fi.issue.id.number}`;
  }

  /**
   * Whether the underlying GitHub issue is closed.
   */
  export function isClosed(fi: dto.FinancialIssue): boolean {
    return fi.issue.closedAt !== null;
  }

  /**
   * Total credit amount collected from all issue fundings.
   */
  export function amountCollected(fi: dto.FinancialIssue): number {
    return fi.issueFundings.reduce((sum, funding) => sum + funding.credit, 0);
  }

  /**
   * The requested credit amount from the managed issue, or null if not managed.
   */
  export function amountRequested(fi: dto.FinancialIssue): number | null {
    return fi.managedIssue?.requestedCreditAmount ?? null;
  }

  /**
   * Whether the issue has been successfully funded (collected >= requested).
   */
  export function successfullyFunded(fi: dto.FinancialIssue): boolean {
    const requested = amountRequested(fi);
    if (requested === null || requested === 0) {
      return false;
    }
    return amountCollected(fi) >= requested;
  }
}
