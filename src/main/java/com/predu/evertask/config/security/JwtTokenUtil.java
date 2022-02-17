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

    private final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);
    private final JwtConfigurationProperties jwtConfigurationProperties;

    public JwtTokenUtil(JwtConfigurationProperties jwtConfigurationProperties) {
        this.jwtConfigurationProperties = jwtConfigurationProperties;
    }

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(format("%s,%s", user.getId(), user.getUsername()))
                .setIssuer(jwtConfigurationProperties.getJwtIssuer())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000))
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

    public String getUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfigurationProperties.getJwtSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject().split(",")[1];
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
