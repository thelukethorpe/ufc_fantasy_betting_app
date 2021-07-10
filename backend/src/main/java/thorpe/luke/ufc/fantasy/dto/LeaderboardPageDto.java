package thorpe.luke.ufc.fantasy.dto;

import java.util.List;

public class LeaderboardPageDto {
  private final List<LeaderboardEntryDto> leaderboard;

  public LeaderboardPageDto(List<LeaderboardEntryDto> leaderboard) {
    this.leaderboard = leaderboard;
  }

  public List<LeaderboardEntryDto> getLeaderboard() {
    return leaderboard;
  }
}
