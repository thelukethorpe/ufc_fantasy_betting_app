package thorpe.luke.ufc.fantasy.dto;

public class AuthenticationDto {

  private final String username;
  private final String token;

  public AuthenticationDto(String username, String token) {
    this.username = username;
    this.token = token;
  }

  public String getUsername() {
    return username;
  }

  public String getToken() {
    return token;
  }
}
