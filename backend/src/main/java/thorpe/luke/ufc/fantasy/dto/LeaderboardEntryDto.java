package thorpe.luke.ufc.fantasy.dto;

public class LeaderboardEntryDto {

  private final int position;
  private final String username;
  private final double balance;

  public LeaderboardEntryDto(int position, String username, double balance) {
    this.position = position;
    this.username = username;
    this.balance = balance;
  }

  public int getPosition() {
    return position;
  }

  public String getUsername() {
    return username;
  }

  public double getBalance() {
    return balance;
  }
}
