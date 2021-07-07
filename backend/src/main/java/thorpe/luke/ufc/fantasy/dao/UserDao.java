package thorpe.luke.ufc.fantasy.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thorpe.luke.ufc.fantasy.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

  User findByUsername(String username);
}
