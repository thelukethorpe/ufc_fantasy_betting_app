package thorpe.luke.ufc.fantasy.resource;

import static thorpe.luke.ufc.fantasy.resource.ResourceUtil.API_PATH_PREFIX;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import thorpe.luke.ufc.fantasy.dto.BoutDto;
import thorpe.luke.ufc.fantasy.util.Expirable;
import thorpe.luke.ufc.fantasy.util.Mutable;

@RestController
public class BoutResource {

  public static final String BOUT_PATH = API_PATH_PREFIX + "/bout";

  private final Mutable<Expirable<List<BoutDto>>> boutCache = new Mutable<>();

  private void 
}
