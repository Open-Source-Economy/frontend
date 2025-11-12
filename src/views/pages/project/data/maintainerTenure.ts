const MAINTAINER_TENURE_BY_OWNER: Record<string, number> = {
  raboof: 8,
  pjfanning: 3,
  mdedetrich: 3,
};

export function getMaintainerTenure(ownerLogin?: string): number | null {
  if (!ownerLogin) {
    return null;
  }
  return MAINTAINER_TENURE_BY_OWNER[ownerLogin.toLowerCase()] ?? null;
}
