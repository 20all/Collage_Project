package com._all.ByaparKarobar.security;

import com._all.ByaparKarobar.entity.User;
import com._all.ByaparKarobar.exception.NotFoundException;
import com._all.ByaparKarobar.repository.UserRepo;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor// use this annotation in service dont use @AllArgsConstructor in a service Class
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public @Nonnull UserDetails loadUserByUsername(@Nonnull String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username)
                .orElseThrow(()-> new  NotFoundException("User/Email not found"));
        return AuthUser.builder()
                .user(user)
                .build();
    }
}
