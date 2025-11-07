/**
 * Format time in seconds to a human-readable string
 */
export function formatWaitTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  } else if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
}

/**
 * Calculate estimated wait time for an item in the bulk sync queue
 */
export function calculateEstimatedWaitTime(
  queuePosition: number,
  queueOrder: string[],
  organizations: Array<{ projectItem: { id: { uuid: string } }; owner?: { publicRepos?: number } | null }>,
  msPerRepo: number,
): number {
  let estimatedWaitSeconds = 0;

  // Sum up publicRepos for all owners ahead in the queue
  for (let i = 0; i < queuePosition - 1; i++) {
    const aheadOrgId = queueOrder[i];
    const aheadOrg = organizations.find(o => o.projectItem.id.uuid === aheadOrgId);
    if (aheadOrg?.owner?.publicRepos) {
      estimatedWaitSeconds += (aheadOrg.owner.publicRepos * msPerRepo) / 1000;
    }
  }

  return estimatedWaitSeconds;
}
