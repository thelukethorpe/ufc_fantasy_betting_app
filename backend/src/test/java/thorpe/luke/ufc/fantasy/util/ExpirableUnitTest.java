package thorpe.luke.ufc.fantasy.util;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.function.Supplier;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import thorpe.luke.ufc.fantasy.TestUtil.Day;

@ExtendWith(MockitoExtension.class)
public class ExpirableUnitTest {

  @Mock Supplier<LocalDateTime> clock;

  @Test
  public void testExpirableExpiresAfterTimeToLive() {
    when(clock.get()).thenReturn(LocalDateTime.of(0, Month.JANUARY, 1, 0, 0));

    Expirable<Day> expirable = new Expirable<>(Day.MONDAY, Duration.ofDays(1), clock);
    assertThat(expirable.expired()).isFalse();
    assertThat(expirable.getValue()).isEqualTo(Day.MONDAY);

    when(clock.get()).thenReturn(LocalDateTime.of(0, Month.JANUARY, 2, 0, 1));

    assertThat(expirable.expired()).isTrue();
    assertThat(expirable.getValue()).isEqualTo(Day.MONDAY);
  }
}
