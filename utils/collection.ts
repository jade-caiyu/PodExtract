import type { ExtractedResources } from "./export";

export interface CollectedItem extends ExtractedResources {
  id: string;
  collectedAt: string;
}

const STORAGE_KEY = "podcast-collections";

export function getCollections(): CollectedItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addCollection(data: ExtractedResources): CollectedItem {
  const item: CollectedItem = {
    ...data,
    id: generateId(),
    collectedAt: new Date().toISOString(),
  };

  const collections = getCollections();
  collections.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));

  return item;
}

export function removeCollection(id: string): void {
  const collections = getCollections();
  const filtered = collections.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearCollections(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

export function isAlreadyCollected(data: ExtractedResources): boolean {
  const collections = getCollections();
  return collections.some(
    (item) =>
      item.episodeTitle === data.episodeTitle &&
      item.podcastName === data.podcastName
  );
}

function generateId(): string {
  return `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
