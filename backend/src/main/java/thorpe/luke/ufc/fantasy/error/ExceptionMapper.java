package thorpe.luke.ufc.fantasy.error;

import java.util.Collections;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import thorpe.luke.ufc.fantasy.dto.ValidationErrorDto;
import thorpe.luke.ufc.fantasy.validator.ValidationErrorException;

@ControllerAdvice
@Order(value = Ordered.HIGHEST_PRECEDENCE)
public class ExceptionMapper {

  @ExceptionHandler
  public ResponseEntity<ValidationErrorDto> handleException(Exception exception) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(
            new ValidationErrorDto(
                Collections.singletonList("The server failed to process your request.")));
  }

  @ExceptionHandler
  public ResponseEntity<ValidationErrorDto> handleException(
      ValidationErrorException validationErrorException) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ValidationErrorDto(validationErrorException.getErrorMessages()));
  }
}
