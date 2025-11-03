import * as dto from "@open-source-economy/api-types";

/**
 * Companion utilities for working with VerificationRecord arrays.
 *
 * Since verification is stored in a separate table with full history,
 * these helpers extract the current status from the records array.
 */
export namespace VerificationRecordCompanion {
  /**
   * Get the current (most recent) verification record for an entity
   */
  export function getCurrentRecord(verificationRecords: dto.VerificationRecord[] | undefined, entityId: string): dto.VerificationRecord | null {
    if (!verificationRecords) return null;

    const records = verificationRecords.filter(r => r.entityId === entityId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return records[0] || null;
  }

  /**
   * Get the current verification status for an entity
   */
  export function getCurrentStatus(verificationRecords: dto.VerificationRecord[] | undefined, entityId: string): dto.VerificationStatus {
    const record = getCurrentRecord(verificationRecords, entityId);
    return record?.status || dto.VerificationStatus.PENDING_REVIEW;
  }

  /**
   * Get the current verification notes for an entity
   */
  export function getCurrentNotes(verificationRecords: dto.VerificationRecord[] | undefined, entityId: string): string | undefined {
    const record = getCurrentRecord(verificationRecords, entityId);
    return record?.notes;
  }

  /**
   * Get all verification records for a specific entity (full history)
   */
  export function getHistory(verificationRecords: dto.VerificationRecord[] | undefined, entityId: string): dto.VerificationRecord[] {
    if (!verificationRecords) return [];

    return verificationRecords.filter(r => r.entityId === entityId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Check if entity needs action (not approved)
   */
  export function needsAction(verificationRecords: dto.VerificationRecord[] | undefined, entityId: string): boolean {
    const status = getCurrentStatus(verificationRecords, entityId);
    return status !== dto.VerificationStatus.APPROVED;
  }
}
