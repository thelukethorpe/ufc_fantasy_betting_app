package thorpe.luke.ufc.fantasy.dto;

public class UserDto {

  private final String username;
  private final String password;

  public UserDto(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }
}
