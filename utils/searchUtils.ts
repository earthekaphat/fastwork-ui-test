export function isRelatedToSearchTerm(title: string, keywords: string[]): boolean {
  const lowerTitle = title.toLowerCase();
  return keywords.some(keyword =>
    lowerTitle.includes(keyword.toLowerCase())
  );
}

export async function validateSearchResults(
  getTitle: (index: number) => Promise<string>,
  count: number,
  keywords: string[]
) {
  for (let i = 0; i < Math.min(count, 6); i++) {
    const title = await getTitle(i);
    if (!isRelatedToSearchTerm(title, keywords)) {
      throw new Error(`Title "${title}" is not related to search keywords`);
    }
  }
}