package com._all.ByaparKarobar.security;

import com._all.ByaparKarobar.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
@Slf4j  // Simple Logging Facade for Java, It’s a logging API, not an implementation
public class JwtUtils {

    public static final long EXPIRATION_TIME_IN_MILLISECOND = 1000L * 60L * 60L * 24L * 30L * 6L; // expires in 6 months
//    1000 ms  = 1 second
//    60       = 1 minute
//    60       = 1 hour
//    24       = 1 day
//    30       = 1 month
//    6        = 6 months

    private SecretKey key;

    @Value("${security.jwt.secret}")
    private String secretJwtString; // make sure the value in the application properties is 32 characters or long

    @PostConstruct
    private void init() {
        byte[] keyBytes = secretJwtString.getBytes(StandardCharsets.UTF_8);
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(User user) {
        String userName = user.getEmail();
        return generateToken(userName);
    }

    public String generateToken(String userName) {
//        log.info("Generating JWT for user: {}", userName);
        return Jwts.builder()
                .subject(userName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MILLISECOND))
                .signWith(key)
                .compact();
    }

    public String getUserNameFromToken(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
//        return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
        return claimsTFunction.apply(parseClaims(token));
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = getUserNameFromToken(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
