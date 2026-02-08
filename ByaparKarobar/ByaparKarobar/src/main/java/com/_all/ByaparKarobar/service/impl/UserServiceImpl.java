package com._all.ByaparKarobar.service.impl;

import com._all.ByaparKarobar.dto.LoginRequest;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.dto.UserDto;
import com._all.ByaparKarobar.entity.Address;
import com._all.ByaparKarobar.entity.User;
import com._all.ByaparKarobar.enums.UserRole;
import com._all.ByaparKarobar.exception.InvalidCredentialsException;
import com._all.ByaparKarobar.exception.NotFoundException;
import com._all.ByaparKarobar.mapper.EntityDtoMapper;
import com._all.ByaparKarobar.repository.UserRepo;
import com._all.ByaparKarobar.security.JwtUtils;
import com._all.ByaparKarobar.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response registerUser(UserDto registrationRequest) {
        UserRole role = UserRole.USER;
        if (registrationRequest.getRole() != null && registrationRequest.getRole().equalsIgnoreCase("merchant")) {
            role = UserRole.MERCHANT;
        }
//        User user = User.builder()
//                .name(registrationRequest.getName())
//                .email(registrationRequest.getEmail())
//                .password(passwordEncoder.encode(registrationRequest.getPassword()))
//                .phoneNumber(registrationRequest.getPhoneNumber())
//                .role(role)
//                .build();

        // creating new user using setters
        User user = new User();
        user.setName(registrationRequest.getName());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setRole(role);

        // Create empty Address and sync bidirectionally : Optional
        if (registrationRequest.getAddress() != null) {
            Address address = new Address();
            address.setStreet(registrationRequest.getAddress().getStreet());
            address.setCity(registrationRequest.getAddress().getCity());
            address.setState(registrationRequest.getAddress().getState());
            address.setZipCode(registrationRequest.getAddress().getZipCode());
            address.setCountry(registrationRequest.getAddress().getCountry());

            user.setAddress(address); // helper method syncs both sides
        }

        // save user(address will cascade automatically)
        User savedUser = userRepo.save(user);

        // map to DTO
        UserDto userDto = entityDtoMapper.mapUserToDtoBasis(savedUser);
        return Response.builder()
                .status(200)
                .message("User Successfully Added!")
                .user(userDto)
                .build();
    }

    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new NotFoundException("Email not Found!"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password doesn't match!");
        }
        String token = jwtUtils.generateToken(user);
        return Response.builder()
                .status(200)
                .message("User Successfully Logged in")
                .token(token)
                .expirationTime("6 Month")
                .role(user.getRole().name())
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasis)
                .toList();
        return Response.builder()
                .status(200)
                .message("Successful")
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        String email = authentication.getName();
        log.info("User Email is {}",email);
        return userRepo.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not Found!"));
    }

    @Override
    public Response getUserInfoAndOrderHistory() {

        User user = getLoginUser();
        UserDto userDto = entityDtoMapper.mapUserToDtoPlusAddressAndOrderHistory(user);

        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }
}
