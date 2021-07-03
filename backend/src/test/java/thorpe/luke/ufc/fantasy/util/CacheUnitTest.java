package thorpe.luke.ufc.fantasy.util;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.time.Duration;
import org.junit.jupiter.api.Test;

public class CacheUnitTest {

  public enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
  }

  public enum Weather {
    SUNNY,
    RAINY,
    CLOUDY,
    WINDY
  }

  public Cache<Day, Weather> cache = new Cache<>(Duration.ofDays(1));

  @Test
  public void testInitialCacheHasSizeZero() {
    assertThat(cache.size()).isEqualTo(0);
  }
}
