interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Global store to survive Next.js dev server hot-reloads
const globalRef = global as unknown as {
  _rateLimitStore?: Map<string, RateLimitRecord>;
  _rateLimitCleanupActive?: boolean;
};

if (!globalRef._rateLimitStore) {
  globalRef._rateLimitStore = new Map();
}

const store = globalRef._rateLimitStore;

// Periodically clean up expired records to prevent memory leaks
if (!globalRef._rateLimitCleanupActive && typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [storeKey, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(storeKey);
      }
    }
  }, 10 * 60 * 1000).unref?.(); // 10 minutes interval, unref so it doesn't block Node exit
  globalRef._rateLimitCleanupActive = true;
}

/**
 * Parse client IP from Request headers
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return '127.0.0.1';
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

/**
 * Process-level memory rate limiter
 * @param ip Client IP address
 * @param key Unique key for the endpoint (e.g. 'seed', 'search', 'post_command')
 * @param limit Max requests allowed in the time window
 * @param windowMs Time window in milliseconds
 */
export function rateLimit(
  ip: string,
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const storeKey = `${ip}:${key}`;
  const record = store.get(storeKey);

  if (!record || now > record.resetTime) {
    // New rate limit window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    store.set(storeKey, newRecord);
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  store.set(storeKey, record);

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}
