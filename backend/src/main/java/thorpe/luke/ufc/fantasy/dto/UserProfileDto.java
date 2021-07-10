package thorpe.luke.ufc.fantasy.dto;

public class UserProfileDto {

  private final String username;
  private final WalletDto wallet;

  public UserProfileDto(String username, WalletDto wallet) {
    this.username = username;
    this.wallet = wallet;
  }

  public String getUsername() {
    return username;
  }

  public WalletDto getWallet() {
    return wallet;
  }
}
