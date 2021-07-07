package thorpe.luke.ufc.fantasy.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import thorpe.luke.ufc.fantasy.dto.UserDto;
import thorpe.luke.ufc.fantasy.entity.User;

@Component
public class UserConverter {

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserConverter(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  public User convertToEntity(UserDto userDto) {
    User user = new User();
    user.setUsername(userDto.getUsername());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    return user;
  }
}
