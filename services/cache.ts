interface CachedItem {
  item: string;
  ttl: number;
  addedMs: number;
}

export class Cache {
  private static map = new Map<string, CachedItem>();

  /**
   * Sets an item in an in-memory cache.
   * @param key Key to retrieve item
   * @param item The value to store
   * @param ttl The lifetime of the item in seconds
   */
  public static set = (key: string, item: string, ttl: number) => {
    let value: CachedItem = {
      item,
      ttl,
      addedMs: Date.now().valueOf(),
    };

    Cache.map.set(key, value);
  };

  public static get = (key: string): string | undefined => {
    const cachedItem = Cache.map.get(key);

    if (cachedItem) {
      const { item, ttl, addedMs } = cachedItem;

      if (
        ttl !== undefined &&
        ttl !== null &&
        addedMs !== undefined &&
        addedMs !== null
      ) {
        const nowMs = Date.now().valueOf();
        const elapsedMs = nowMs - addedMs;

        if (elapsedMs < ttl * 1000) {
          return item;
        } else {
          Cache.delete(key);
          return undefined;
        }
      }
    }

    return undefined;
  };

  public static delete = (key: string) => {
    // Remove from in-memory cache
    Cache.map.delete(key);
  };
}
