
interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private maxAttempts: number;
  private windowMs: number;
  private blockDurationMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000, blockDurationMs = 30 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.blockDurationMs = blockDurationMs;
  }

  isBlocked(identifier: string): boolean {
    const entry = this.storage.get(identifier);
    if (!entry) return false;

    const now = Date.now();
    
    // Check if block period has expired
    if (entry.blocked && (now - entry.lastAttempt) > this.blockDurationMs) {
      this.storage.delete(identifier);
      return false;
    }

    return entry.blocked;
  }

  recordAttempt(identifier: string): { allowed: boolean; remainingAttempts: number; blockTimeMs?: number } {
    if (this.isBlocked(identifier)) {
      const entry = this.storage.get(identifier)!;
      const blockTimeRemaining = this.blockDurationMs - (Date.now() - entry.lastAttempt);
      return { 
        allowed: false, 
        remainingAttempts: 0,
        blockTimeMs: blockTimeRemaining
      };
    }

    const now = Date.now();
    let entry = this.storage.get(identifier);

    if (!entry || (now - entry.lastAttempt) > this.windowMs) {
      // Reset or create new entry
      entry = { attempts: 1, lastAttempt: now, blocked: false };
      this.storage.set(identifier, entry);
      return { allowed: true, remainingAttempts: this.maxAttempts - 1 };
    }

    entry.attempts++;
    entry.lastAttempt = now;

    if (entry.attempts >= this.maxAttempts) {
      entry.blocked = true;
      this.storage.set(identifier, entry);
      return { 
        allowed: false, 
        remainingAttempts: 0,
        blockTimeMs: this.blockDurationMs
      };
    }

    this.storage.set(identifier, entry);
    return { 
      allowed: true, 
      remainingAttempts: this.maxAttempts - entry.attempts 
    };
  }

  getRemainingAttempts(identifier: string): number {
    const entry = this.storage.get(identifier);
    if (!entry) return this.maxAttempts;
    
    const now = Date.now();
    if ((now - entry.lastAttempt) > this.windowMs) {
      return this.maxAttempts;
    }
    
    return Math.max(0, this.maxAttempts - entry.attempts);
  }
}

// Global rate limiter instance
export const paymentRateLimiter = new RateLimiter(3, 10 * 60 * 1000, 60 * 60 * 1000); // 3 attempts per 10 minutes, 1 hour block
