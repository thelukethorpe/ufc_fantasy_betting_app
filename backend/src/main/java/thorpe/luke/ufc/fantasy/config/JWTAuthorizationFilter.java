package thorpe.luke.ufc.fantasy.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

  private static final String HEADER = "Authorization";
  private static final String PREFIX = "Bearer ";
  private static final String AUTHORITIES = "authorities";

  @Value("${jwt.token.secret}")
  private String secret;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      Authentication authenticationToken = extractAuthenticationToken(request, response);
      if (authenticationToken != null) {
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      } else {
        SecurityContextHolder.clearContext();
      }
      filterChain.doFilter(request, response);
    } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException e) {
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      response.sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
    }
  }

  private Authentication extractAuthenticationToken(
      HttpServletRequest request, HttpServletResponse response) {
    if (!tokenExists(request, response)) {
      return null;
    }
    Claims claims = extractTokenClaims(request);
    Object authorities = claims.get(AUTHORITIES);
    if (!(authorities instanceof List)) {
      return null;
    }
    List<String> authoritiesList = (List) authorities;
    return new UsernamePasswordAuthenticationToken(
        claims.getSubject(),
        null,
        authoritiesList.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
  }

  private boolean tokenExists(HttpServletRequest request, HttpServletResponse response) {
    String authenticationHeader = request.getHeader(HEADER);
    return authenticationHeader != null && authenticationHeader.startsWith(PREFIX);
  }

  private Claims extractTokenClaims(HttpServletRequest request) {
    String jwtToken = request.getHeader(HEADER).replace(PREFIX, "");
    return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(jwtToken).getBody();
  }
}
