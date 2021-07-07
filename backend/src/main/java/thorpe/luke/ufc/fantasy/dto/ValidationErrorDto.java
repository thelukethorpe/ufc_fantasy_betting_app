package thorpe.luke.ufc.fantasy.dto;

import java.util.List;

public class ValidationErrorDto {

  private final List<String> errors;

  public ValidationErrorDto(List<String> errors) {
    this.errors = errors;
  }

  public List<String> getErrors() {
    return errors;
  }
}
