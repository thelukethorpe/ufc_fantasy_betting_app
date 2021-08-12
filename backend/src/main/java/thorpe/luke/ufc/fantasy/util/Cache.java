package thorpe.luke.ufc.fantasy.util;

import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class Cache<TKey, TValue> {

  private final Duration timeToLive;
  private final ConcurrentMap<TKey, Expirable<TValue>> entries;

  public Cache(Duration timeToLive) {
    this.timeToLive = timeToLive;
    this.entries = new ConcurrentHashMap<>();
  }

  public Optional<TValue> get(TKey key) {
    Expirable<TValue> entry = entries.get(key);
    if (entry == null || entry.expired()) {
      entries.remove(key);
      return Optional.empty();
    }
    return Optional.of(entry.getValue());
  }

  public void add(TKey key, TValue value) {
    entries.put(key, new Expirable<>(value, timeToLive));
  }

  public int size() {
    return entries.size();
  }
}
