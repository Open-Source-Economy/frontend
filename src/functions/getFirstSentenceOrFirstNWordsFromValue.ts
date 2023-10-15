export function getFirstSentenceOrFirstNWordsFromValue(value: string, N: number): string {
  if (!value || !N) return "";

  // Get first paragraph
  var index: number = value.indexOf("\n");
  if (index !== -1) {
    value = value.substring(0, index);
  }

  // Get first sentence
  index = value.indexOf(".");
  if (index !== -1) {
    return value
      .substring(0, index + 1)
      .split(" ")
      .slice(0, N)
      .join(" ");
  } else {
    // Return first N words of remaining value
    return value.split(" ").slice(0, N).join(" ") + " ...";
  }
}
