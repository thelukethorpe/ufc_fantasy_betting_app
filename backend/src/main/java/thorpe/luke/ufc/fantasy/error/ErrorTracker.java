package thorpe.luke.ufc.fantasy.error;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Function;

public class ErrorTracker<TError> {

  private final List<TError> errors;

  public ErrorTracker() {
    this.errors = new LinkedList<>();
  }

  public void trackError(TError error) {
    errors.add(error);
  }

  public <TrackingException extends Exception> void throwIfErrorsArePresentUsing(
      Function<List<TError>, TrackingException> messageToException) throws TrackingException {
    if (!errors.isEmpty()) {
      throw messageToException.apply(errors);
    }
  }
}
