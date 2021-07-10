package thorpe.luke.ufc.fantasy.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import thorpe.luke.ufc.fantasy.entity.User;
import thorpe.luke.ufc.fantasy.util.Page;

@Service
public class LeaderboardService {

  private static final Comparator<? super User> LEADERBOARD_SCORE_ORDERING_ASC =
      Comparator.comparing(user -> user.getWallet().getBalance());
  private static final Comparator<? super User> LEADERBOARD_SCORE_ORDERING_DESC =
      LEADERBOARD_SCORE_ORDERING_ASC.reversed();

  private final UserService userService;

  @Autowired
  public LeaderboardService(UserService userService) {
    this.userService = userService;
  }

  public List<User> getLeaderboardUsers(Page page) {
    return userService.getAllUsers().stream()
        .sorted(LEADERBOARD_SCORE_ORDERING_DESC)
        .skip(page.startIndex())
        .limit(page.size())
        .collect(Collectors.toList());
  }
}
