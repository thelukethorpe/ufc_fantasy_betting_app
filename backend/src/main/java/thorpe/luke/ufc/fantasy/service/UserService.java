package thorpe.luke.ufc.fantasy.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import thorpe.luke.ufc.fantasy.adapter.UserDetailsAdapter;
import thorpe.luke.ufc.fantasy.config.PropertiesConfig;
import thorpe.luke.ufc.fantasy.dao.UserDao;
import thorpe.luke.ufc.fantasy.entity.User;
import thorpe.luke.ufc.fantasy.entity.Wallet;
import thorpe.luke.ufc.fantasy.util.DateTimeUtil;

@Service
public class UserService implements UserDetailsService {

  private final PropertiesConfig propertiesConfig;
  private final UserDao userDao;

  @Autowired
  public UserService(PropertiesConfig propertiesConfig, UserDao userDao) {
    this.propertiesConfig = propertiesConfig;
    this.userDao = userDao;
  }

  public Collection<User> getAllUsers() {
    return userDao.findAll();
  }

  public User getByUsername(String username) {
    return userDao.findByUsername(username);
  }

  public String getTokenFromUsername(String username) {
    List<GrantedAuthority> grantedAuthorities =
        AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime expiryTime = now.plus(Duration.ofHours(1));
    return Jwts.builder()
        .setId("softtekJWT")
        .setSubject(username)
        .claim(
            "authorities",
            grantedAuthorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()))
        .setIssuedAt(DateTimeUtil.localDateTimeToDate(now))
        .setExpiration(DateTimeUtil.localDateTimeToDate(expiryTime))
        .signWith(SignatureAlgorithm.HS512, propertiesConfig.getJwtTokenSecret().getBytes())
        .compact();
  }

  public void createUser(User user) {
    Wallet wallet = new Wallet();
    user.setWallet(wallet);
    wallet.setUser(user);
    userDao.save(user);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = getByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException(username);
    }
    return new UserDetailsAdapter(user);
  }

  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = (String) authentication.getPrincipal();
    return getByUsername(username);
  }
}
