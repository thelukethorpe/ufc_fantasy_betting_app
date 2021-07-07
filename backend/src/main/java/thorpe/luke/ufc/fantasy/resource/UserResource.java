package thorpe.luke.ufc.fantasy.resource;

import static thorpe.luke.ufc.fantasy.resource.ResourceUtil.API_PATH_PREFIX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import thorpe.luke.ufc.fantasy.converter.UserConverter;
import thorpe.luke.ufc.fantasy.dto.AuthenticationDto;
import thorpe.luke.ufc.fantasy.dto.UserDto;
import thorpe.luke.ufc.fantasy.entity.User;
import thorpe.luke.ufc.fantasy.service.UserService;
import thorpe.luke.ufc.fantasy.validator.UserValidator;

@RestController
public class UserResource {

  public static final String USER_PATH = API_PATH_PREFIX + "/user";
  public static final String USER_AUTH_PATH = USER_PATH + "/auth";
  public static final String USER_AUTH_SIGN_UP_PATH = USER_AUTH_PATH + "/sign-up";
  public static final String USER_AUTH_LOGIN_PATH = USER_AUTH_PATH + "/login";

  private final UserValidator userValidator;
  private final UserConverter userConverter;
  private final UserService userService;

  @Autowired
  public UserResource(
      UserValidator userValidator, UserConverter userConverter, UserService userService) {
    this.userConverter = userConverter;
    this.userService = userService;
    this.userValidator = userValidator;
  }

  @PostMapping(value = USER_AUTH_SIGN_UP_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(code = HttpStatus.OK)
  public ResponseEntity<AuthenticationDto> signUp(@RequestBody UserDto userDto) {
    userValidator.validateOnSignUp(userDto);
    User user = userConverter.convertToEntity(userDto);
    userService.createUser(user);
    return ResponseEntity.ok().body(toAuthenticationDto(userDto));
  }

  @PostMapping(value = USER_AUTH_LOGIN_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(code = HttpStatus.OK)
  public ResponseEntity<AuthenticationDto> login(@RequestBody UserDto userDto) {
    userValidator.validateOnLogin(userDto);
    return ResponseEntity.ok().body(toAuthenticationDto(userDto));
  }

  private AuthenticationDto toAuthenticationDto(UserDto userDto) {
    String username = userDto.getUsername();
    String token = userService.getTokenFromUsername(username);
    return new AuthenticationDto(username, token);
  }
}
