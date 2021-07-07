package thorpe.luke.ufc.fantasy.validator;

import thorpe.luke.ufc.fantasy.error.ErrorTracker;

public class ValidationErrorTracker extends ErrorTracker<String> {

  public void throwIfErrorsArePresent() {
    super.throwIfErrorsArePresentUsing(ValidationErrorException::new);
  }
}
