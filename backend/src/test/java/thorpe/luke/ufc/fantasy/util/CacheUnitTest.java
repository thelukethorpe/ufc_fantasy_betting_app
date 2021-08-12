package thorpe.luke.ufc.fantasy.util;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.time.Duration;
import org.junit.jupiter.api.Test;
import thorpe.luke.ufc.fantasy.TestUtil.Day;
import thorpe.luke.ufc.fantasy.TestUtil.Weather;

public class CacheUnitTest {

  Cache<Day, Weather> cache = new Cache<>(Duration.ofDays(1));

  @Test
  public void testInitialCacheHasSizeZero() {
    assertThat(cache.size()).isEqualTo(0);
  }
}
