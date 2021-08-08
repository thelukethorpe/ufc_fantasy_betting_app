package thorpe.luke.ufc.fantasy.util;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.function.Supplier;

public class Expirable<TValue> {

  private final TValue value;
  private final LocalDateTime expiryTime;
  private final Supplier<LocalDateTime> clock;

  public Expirable(TValue value, Duration timeToLive, Supplier<LocalDateTime> clock) {
    this.value = value;
    this.clock = clock;
    this.expiryTime = now().plus(timeToLive);
  }

  public Expirable(TValue value, Duration timeToLive) {
    this(value, timeToLive, LocalDateTime::now);
  }

  private LocalDateTime now() {
    return clock.get();
  }

  public boolean expired() {
    return now().isAfter(expiryTime);
  }

  public TValue getValue() {
    return value;
  }
}
