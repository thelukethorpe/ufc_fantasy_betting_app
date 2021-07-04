package thorpe.luke.ufc.fantasy.validator;

import java.util.List;

public class ValidationErrorException extends RuntimeException {

  private final List<String> errorMessages;

  public ValidationErrorException(List<String> errorMessages) {
    this.errorMessages = errorMessages;
  }

  public List<String> getErrorMessages() {
    return errorMessages;
  }
}
