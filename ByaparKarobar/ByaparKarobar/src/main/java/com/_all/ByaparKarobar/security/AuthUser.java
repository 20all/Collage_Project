package com._all.ByaparKarobar.security;

import com._all.ByaparKarobar.entity.User;
import jakarta.annotation.Nonnull;
import lombok.Builder;
import lombok.Data;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
public class AuthUser implements UserDetails {

    private User user;

    @Override
    public @Nonnull Collection<? extends GrantedAuthority> getAuthorities() { // here I have used @NonNull annotation since the ide was hinting me to do so
//        return List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole().name())); // this is from chatGPT
        return List.of(new SimpleGrantedAuthority(user.getRole().name()));
    }

    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }

    @Override
    public @Nonnull String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
