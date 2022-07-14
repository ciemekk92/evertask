package com.predu.evertask.config.security;

import com.predu.evertask.JwtConfigurationProperties;
import com.predu.evertask.domain.model.User;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

import static java.lang.String.format;

@Component
public class JwtTokenUtil {

    private static final String AUTHENTICATED = "authenticated";
    private static final long TEMP_TOKEN_VALIDITY = 5 * 60 * 1000L;
    private static final long TOKEN_VALIDITY = 60 * 60 * 1000L;
    private final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);
    private final JwtConfigurationProperties jwtConfigurationProperties;

    public JwtTokenUtil(JwtConfigurationProperties jwtConfigurationProperties) {
        this.jwtConfigurationProperties = jwtConfigurationProperties;
    }

    public String generateAccessToken(User user, boolean authenticated) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (authenticated ? TOKEN_VALIDITY : TEMP_TOKEN_VALIDITY));

        return Jwts.builder()
                .setSubject(format("%s", user.getId()))
                .claim(AUTHENTICATED, authenticated)
                .setIssuer(jwtConfigurationProperties.getJwtIssuer())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtConfigurationProperties.getJwtSecret())
                .compact();
    }

    public UUID getUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfigurationProperties.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return UUID.fromString(claims.getSubject().split(",")[0]);
    }

    public boolean isAuthenticated(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfigurationProperties.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.get(AUTHENTICATED, Boolean.class);
    }

    public Date getExpirationDate(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfigurationProperties.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.getExpiration();
    }

    public boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(jwtConfigurationProperties.getJwtSecret()).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature - {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token - {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token - {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token - {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty - {}", ex.getMessage());
        }
        return false;
    }
}
