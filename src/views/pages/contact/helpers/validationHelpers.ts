export const scrollToFirstError = (): void => {
  const firstErrorField = document.querySelector("[data-error='true']");
  if (firstErrorField) {
    firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
