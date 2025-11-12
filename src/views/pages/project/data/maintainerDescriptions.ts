const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  raboof: "Independent Open Source Engineer & Security response program manager at the Apache Foundation",
  pjfanning: "Experienced developer with an interest in open source. Member of Apache Software Foundation.",
  mdedetrich: "Software engineer focused on distributed systems. Member of Apache Software Foundation.",
};

export function getMaintainerDescription(ownerLogin?: string): string | null {
  if (!ownerLogin) {
    return null;
  }
  return DEFAULT_DESCRIPTIONS[ownerLogin.toLowerCase()] ?? null;
}
