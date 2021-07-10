package thorpe.luke.ufc.fantasy.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import thorpe.luke.ufc.fantasy.dto.UserDto;
import thorpe.luke.ufc.fantasy.dto.UserProfileDto;
import thorpe.luke.ufc.fantasy.dto.WalletDto;
import thorpe.luke.ufc.fantasy.entity.User;

@Component
public class UserConverter {

  private final PasswordEncoder passwordEncoder;
  private final WalletConverter walletConverter;

  @Autowired
  public UserConverter(PasswordEncoder passwordEncoder, WalletConverter walletConverter) {
    this.passwordEncoder = passwordEncoder;
    this.walletConverter = walletConverter;
  }

  public User convertToEntity(UserDto userDto) {
    User user = new User();
    user.setUsername(userDto.getUsername());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    return user;
  }

  public UserProfileDto convertToProfileDto(User user) {
    WalletDto walletDto = walletConverter.convertToDto(user.getWallet());
    return new UserProfileDto(user.getUsername(), walletDto);
  }
}
