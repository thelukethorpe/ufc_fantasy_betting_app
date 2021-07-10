package thorpe.luke.ufc.fantasy.converter;

import org.springframework.stereotype.Component;
import thorpe.luke.ufc.fantasy.dto.WalletDto;
import thorpe.luke.ufc.fantasy.entity.Wallet;

@Component
public class WalletConverter {

  public WalletDto convertToDto(Wallet wallet) {
    return new WalletDto(wallet.getBalance());
  }
}
