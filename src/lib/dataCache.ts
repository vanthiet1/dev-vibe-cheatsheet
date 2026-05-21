import { ICategory, ICommand } from "@/types";

interface CacheStore {
  categories: ICategory[] | null;
  commands: ICommand[] | null;
  lastUpdated: number;
}

// Global is used here to maintain the cache store across hot reloads in development.
// This prevents the cache from being reset to null on every hot reload during development.
interface GlobalCache {
  dataCacheStore: CacheStore | undefined;
}

declare global {
  var cacheGlobal: GlobalCache | undefined;
}

if (!global.cacheGlobal) {
  global.cacheGlobal = {
    dataCacheStore: {
      categories: null,
      commands: null,
      lastUpdated: 0,
    },
  };
}

const cache = global.cacheGlobal.dataCacheStore!;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function getCachedCategories(): ICategory[] | null {
  const now = Date.now();
  if (cache.categories && now - cache.lastUpdated < CACHE_TTL) {
    return cache.categories;
  }
  return null;
}

export function setCachedCategories(categories: ICategory[]) {
  cache.categories = categories;
  cache.lastUpdated = Date.now();
}

export function getCachedCommands(): ICommand[] | null {
  const now = Date.now();
  if (cache.commands && now - cache.lastUpdated < CACHE_TTL) {
    return cache.commands;
  }
  return null;
}

export function setCachedCommands(commands: ICommand[]) {
  cache.commands = commands;
  cache.lastUpdated = Date.now();
}

export function invalidateCache() {
  cache.categories = null;
  cache.commands = null;
  cache.lastUpdated = 0;
}
