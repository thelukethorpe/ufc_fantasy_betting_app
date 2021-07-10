package thorpe.luke.ufc.fantasy.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import thorpe.luke.ufc.fantasy.resource.LeaderboardResource;
import thorpe.luke.ufc.fantasy.resource.UserResource;
import thorpe.luke.ufc.fantasy.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final PropertiesConfig propertiesConfig;
  private final UserService userService;

  @Autowired
  public SecurityConfig(PropertiesConfig propertiesConfig, UserService userService) {
    this.propertiesConfig = propertiesConfig;
    this.userService = userService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    if (propertiesConfig.getHerokuHttpsEnabled()) {
      http.requiresChannel()
          .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
          .requiresSecure();
    }
    http.csrf()
        .disable()
        .cors()
        .and()
        .addFilterAfter(
            new JWTAuthorizationFilter(propertiesConfig.getJwtTokenSecret()),
            UsernamePasswordAuthenticationFilter.class)
        .authorizeRequests()
        .antMatchers(
            UserResource.USER_AUTH_SIGN_UP_PATH,
            UserResource.USER_AUTH_LOGIN_PATH,
            LeaderboardResource.LEADERBOARD_PATH)
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

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("*"));
    configuration.setAllowedMethods(
        Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
    configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
