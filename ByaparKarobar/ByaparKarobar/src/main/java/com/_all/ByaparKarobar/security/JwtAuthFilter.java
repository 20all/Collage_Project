package com._all.ByaparKarobar.security;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService customUserDetailsService;

    // code from ChatGPT and is optional
//    // OPTIONAL: public endpoints that should skip JWT validation
//    private static final String[] PUBLIC_ENDPOINTS = {"/auth/login", "/auth/register"};


    @Override
    protected void doFilterInternal(@Nonnull HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull FilterChain filterChain) throws ServletException, IOException {

        // code from ChatGPT and is optional
//        // Skip JWT check for public endpoints
//        if (shouldNotFilter(request)) {
//            filterChain.doFilter(request, response);
//            return;
//        }

        try {
            String token = getTokenFromRequest(request);

            if(token != null) {
                String userName = jwtUtils.getUserNameFromToken(token);

                if(StringUtils.hasText(userName)) {
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);

                    if(jwtUtils.isTokenValid(token, userDetails)) {
                        log.info("VALID JWT FOR {}",userName);

                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        //                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        // added security context check (it prevents overwriting an existing authentication), bug
                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }
                    } else {
                        log.warn("Invalid JWT for user: {}", userName);
                    }
                }
            }
        } catch (UsernameNotFoundException e) {
//            throw new RuntimeException(e);
            log.error("User not found during JWT authentication", e);
        } catch (Exception e) {
            log.warn("Failed to authenticate JWT token", e);
        }
        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if(StringUtils.hasText(token) && StringUtils.startsWithIgnoreCase(token, "Bearer ")) {
            return token.substring(7);
        }
        return null;
    }

    // code from ChatGPT don't use not needed now
//    // Optional: skip filter for public endpoints
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) {
//        String path = request.getServletPath();
//        for (String endpoint : PUBLIC_ENDPOINTS) {
//            if (path.startsWith(endpoint)) return true;
//        }
//        return false;
//    }
}
