package thorpe.luke.ufc.fantasy.resource;

import static thorpe.luke.ufc.fantasy.resource.ResourceUtil.API_PATH_PREFIX;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import thorpe.luke.ufc.fantasy.converter.LeaderboardPageConverter;
import thorpe.luke.ufc.fantasy.dto.LeaderboardPageDto;
import thorpe.luke.ufc.fantasy.entity.User;
import thorpe.luke.ufc.fantasy.service.LeaderboardService;
import thorpe.luke.ufc.fantasy.util.Page;

@RestController
public class LeaderboardResource {

  public static final String LEADERBOARD_PATH = API_PATH_PREFIX + "/leaderboard";

  private final LeaderboardService leaderboardService;
  private final LeaderboardPageConverter leaderboardPageConverter;

  @Autowired
  public LeaderboardResource(
      LeaderboardService leaderboardService, LeaderboardPageConverter leaderboardPageConverter) {
    this.leaderboardService = leaderboardService;
    this.leaderboardPageConverter = leaderboardPageConverter;
  }

  @GetMapping(value = LEADERBOARD_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(code = HttpStatus.OK)
  public ResponseEntity<LeaderboardPageDto> getLeaderboardPages(
      @RequestParam int pageNumber, int pageSize) {
    Page page = Page.builder().withPageNumber(pageNumber).withPageSize(pageSize).build();
    List<User> leaderboardUsers = leaderboardService.getLeaderboardUsers(page);
    return ResponseEntity.ok()
        .body(leaderboardPageConverter.convertListOfUsersToLeaderboardPage(leaderboardUsers, page));
  }
}
