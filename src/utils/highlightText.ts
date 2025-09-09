export function highlightText(text: string, search: string) {
  return text.replaceAll(search, `[`);
}
