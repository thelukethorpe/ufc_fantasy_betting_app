package thorpe.luke.ufc.fantasy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import thorpe.luke.ufc.fantasy.resource.UserResource;
import thorpe.luke.ufc.fantasy.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${heroku.https.enabled}")
  private Boolean herokuHttpsEnabled;

  private final UserService userService;

  @Autowired
  public SecurityConfig(UserService userService) {
    this.userService = userService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    if (herokuHttpsEnabled) {
      http.requiresChannel()
          .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
          .requiresSecure();
    }
    http.csrf()
        .disable()
        .addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
        .authorizeRequests()
        .antMatchers(UserResource.USER_AUTH_SIGN_UP_PATH, UserResource.USER_AUTH_LOGIN_PATH)
        .permitAll()
        .anyRequest()
        .authenticated();
  }

  @Bean
  @Override
  public UserDetailsService userDetailsService() {
    return userService;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
