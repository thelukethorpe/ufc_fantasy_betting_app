package thorpe.luke.ufc.fantasy.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "WALLET_TABLE")
public class Wallet {

  public static final double DEFAULT_STARTING_BALANCE = 1500.00;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private Long id;

  @Column(name = "BALANCE_USD", nullable = false)
  private Double balance;

  @OneToOne(mappedBy = "wallet")
  private User user;

  public Wallet() {
    this.balance = DEFAULT_STARTING_BALANCE;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Double getBalance() {
    return balance;
  }

  public void setBalance(Double balance) {
    this.balance = balance;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
