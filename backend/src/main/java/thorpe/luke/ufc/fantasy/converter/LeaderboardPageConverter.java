package thorpe.luke.ufc.fantasy.converter;

import java.util.LinkedList;
import java.util.List;
import org.springframework.stereotype.Component;
import thorpe.luke.ufc.fantasy.dto.LeaderboardEntryDto;
import thorpe.luke.ufc.fantasy.dto.LeaderboardPageDto;
import thorpe.luke.ufc.fantasy.entity.User;
import thorpe.luke.ufc.fantasy.util.Page;

@Component
public class LeaderboardPageConverter {

  public LeaderboardPageDto convertListOfUsersToLeaderboardPage(List<User> users, Page page) {
    List<LeaderboardEntryDto> leaderboard = new LinkedList<>();
    int position = page.startIndex() + 1;
    for (User user : users) {
      leaderboard.add(
          new LeaderboardEntryDto(position++, user.getUsername(), user.getWallet().getBalance()));
    }
    return new LeaderboardPageDto(leaderboard);
  }
}
