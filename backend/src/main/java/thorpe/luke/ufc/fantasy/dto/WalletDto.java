package thorpe.luke.ufc.fantasy.dto;

public class WalletDto {
  private final Double balance;

  public WalletDto(Double balance) {
    this.balance = balance;
  }

  public Double getBalance() {
    return balance;
  }
}
