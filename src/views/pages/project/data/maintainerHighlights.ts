const DEFAULT_HIGHLIGHTS: Record<string, string> = {
  raboof: "Ex: Principal Engineer at Akka",
  pjfanning: "Since Apache Pekko Conception",
  mdedetrich: "Since Apache Pekko Conception",
};

export function getMaintainerHighlight(ownerLogin?: string): string | null {
  if (!ownerLogin) {
    return null;
  }
  return DEFAULT_HIGHLIGHTS[ownerLogin.toLowerCase()] ?? null;
}
