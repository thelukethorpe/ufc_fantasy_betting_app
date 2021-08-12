package thorpe.luke.ufc.fantasy.entity;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "FIGHTER_TABLE")
public class Fighter {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private Long id;

  @Column(name = "NAME", nullable = false, unique = true)
  private String name;

  @OneToMany(targetEntity = Bout.class, mappedBy = "redCornerFighter", cascade = CascadeType.ALL)
  private List<Bout> redCornerBoutHistory = new LinkedList<>();

  @OneToMany(targetEntity = Bout.class, mappedBy = "blueCornerFighter", cascade = CascadeType.ALL)
  private List<Bout> blueCornerBoutHistory = new LinkedList<>();
}
