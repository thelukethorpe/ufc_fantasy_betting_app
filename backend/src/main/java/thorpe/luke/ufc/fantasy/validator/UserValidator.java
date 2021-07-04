package thorpe.luke.ufc.fantasy.validator;

import static thorpe.luke.ufc.fantasy.validator.ValidationUtil.fieldDoesNotExist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import thorpe.luke.ufc.fantasy.dto.UserDto;
import thorpe.luke.ufc.fantasy.entity.User;
import thorpe.luke.ufc.fantasy.service.UserService;

@Service
public class UserValidator {

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserValidator(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  public void validateOnSignUp(UserDto userDto) {
    ValidationErrorTracker errorTracker = new ValidationErrorTracker();

    // Syntax checks.
    validateSyntax(userDto, errorTracker);

    // Semantic checks.
    User user = userService.getByUsername(userDto.getUsername());
    if (user != null) {
      errorTracker.trackError(
          "User with username \"" + userDto.getUsername() + "\" already exists.");
    }
    errorTracker.throwIfErrorsArePresent();
  }

  public void validateOnLogin(UserDto userDto) {
    ValidationErrorTracker errorTracker = new ValidationErrorTracker();

    // Syntax checks.
    validateSyntax(userDto, errorTracker);

    // Semantic checks.
    User user = userService.getByUsername(userDto.getUsername());
    if (user == null) {
      errorTracker.trackError(
          "User with username \"" + userDto.getUsername() + "\" does not exist.");
    } else if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
      errorTracker.trackError("Incorrect password.");
    }
    errorTracker.throwIfErrorsArePresent();
  }

  private void validateSyntax(UserDto userDto, ValidationErrorTracker errorTracker) {
    if (fieldDoesNotExist(userDto.getUsername())) {
      errorTracker.trackError("Username missing.");
    }
    if (fieldDoesNotExist(userDto.getPassword())) {
      errorTracker.trackError("Password missing.");
    }
    // Remaining checks rely on fields existing.
    errorTracker.throwIfErrorsArePresent();

    if (userDto.getUsername().length() > User.MAX_USERNAME_LENGTH) {
      errorTracker.trackError(
          "Username cannot be more than " + User.MAX_USERNAME_LENGTH + "characters long.");
    }
    if (!userDto.getUsername().matches("[a-zA-Z0-9]+")) {

      errorTracker.trackError("Username can only consist of numbers and letters.");
    }
  }
}
