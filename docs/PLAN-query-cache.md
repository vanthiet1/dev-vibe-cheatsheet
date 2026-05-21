# PLAN - Optimizing Query Performance & Adding Data Cache

Implementation plan for optimizing the initial loading speed of Dev-CheatSheet commands and categories. Since the application currently connects to MongoDB and runs queries on every single request, this plan introduces a fast, lightweight, and zero-dependency in-memory caching mechanism with automated cache invalidation.

---

## User Review Required

> [!IMPORTANT]
> - **In-Memory Caching Store:** We will use a Node.js process-level memory cache to avoid external cache database dependencies (like Redis). This is highly efficient and runs in sub-millisecond speeds.
> - **Cache TTL & Invalidation:** The cache will have a default TTL of 10 minutes, but it will be **automatically invalidated** (flushed) immediately on any `POST`/`PUT`/`DELETE` calls or `seed` operations, ensuring no stale data is ever presented to users.

---

## Open Questions

> [!NOTE]
> 1. **Cache TTL duration:** Is the 10-minute cache TTL suitable for your workflow, or would you prefer a shorter/longer duration?
> 2. **In-Memory vs Persistent Store:** Are you planning to deploy this application to a serverless platform (like Vercel Serverless Functions) or a containerized/dedicated host (like Docker, VPS, or Render)?
>    - *If serverless:* Serverless instances can spin down or scale horizontally, which makes process-level memory cache unique to each container. For small scale read-heavy applications, process-level caching is still highly beneficial and acts as a localized warm cache.
>    - *If persistent (VPS/Docker):* Process-level memory cache works perfectly, sharing memory across all users with 100% hits.

---

## Proposed Changes

We will introduce a new caching module and integrate it into the API routes for categories, commands, and database seeding.

### Core Utilities

#### [NEW] [dataCache.ts](file:///d:/dev-vibe-cheatsheet/src/lib/dataCache.ts)
Create a cache manager for categories and commands.
- Process-level module variables to store active cached lists.
- Verification of expiration (TTL-based).
- Immediate invalidation (flush) methods.

```typescript
import { ICategory, ICommand } from "@/types";

interface CacheStore {
  categories: ICategory[] | null;
  commands: ICommand[] | null;
  lastUpdated: number;
}

const cache: CacheStore = {
  categories: null,
  commands: null,
  lastUpdated: 0,
};

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
```

---

### App Router API Routes

#### [MODIFY] [route.ts](file:///d:/dev-vibe-cheatsheet/src/app/api/categories/route.ts)
- `GET`: Check `getCachedCategories()`. Return immediately if cached. Otherwise, query database and populate cache.
- `POST`: Create category, then trigger `invalidateCache()`.

#### [MODIFY] [route.ts](file:///d:/dev-vibe-cheatsheet/src/app/api/commands/route.ts)
- `GET`: Check `getCachedCommands()`. If cached:
  - If filters are supplied (like `categoryId` or `tag`), filter the cached array **in-memory** for sub-millisecond response times.
  - If no filters, return the cached array directly.
  - If cache is empty, query database, populate cache, and filter.
- `POST`: Create command, then trigger `invalidateCache()`.

#### [MODIFY] [route.ts](file:///d:/dev-vibe-cheatsheet/src/app/api/seed/route.ts)
- Invalidate cache immediately when seed operation is called, forcing next loads to fetch fresh seeded records from database.

---

## Verification Plan

We will measure latency before and after implementing the caching layer.

### Automated Tests & Performance Measurement
1. **Query speed metrics:** Log response times of `/api/categories` and `/api/commands` during execution to observe optimization.
2. **First-cold load vs cached warm loads:**
   - 1st load: ~100-300ms (database hit)
   - 2nd load: ~1-3ms (cache hit)
3. **Invalidation check:**
   - Call `POST` or `seed` to trigger cache flush.
   - Observe next request triggers a fresh database hit, and subsequent requests hit cache again.
