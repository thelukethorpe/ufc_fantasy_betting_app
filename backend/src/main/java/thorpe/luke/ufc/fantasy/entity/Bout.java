package thorpe.luke.ufc.fantasy.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "BOUT_TABLE")
public class Bout {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private Long id;

  @Column(name = "START_TIME", nullable = false)
  private LocalDateTime startTime;

  @ManyToOne()
  @JoinColumn(name = "RED_CORNER_FIGHTER_ID", referencedColumnName = "ID")
  private Fighter redCornerFighter;

  @Column(name = "RED_CORNER_ODDS", nullable = false)
  private Integer redCornerOdds;

  @ManyToOne()
  @JoinColumn(name = "BLUE_CORNER_FIGHTER_ID", referencedColumnName = "ID")
  private Fighter blueCornerFighter;

  @Column(name = "BLUE_CORNER_ODDS", nullable = false)
  private Integer blueCornerOdds;
}
