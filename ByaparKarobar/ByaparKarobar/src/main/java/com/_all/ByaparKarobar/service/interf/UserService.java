package com._all.ByaparKarobar.service.interf;

import com._all.ByaparKarobar.dto.LoginRequest;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.dto.UserDto;
import com._all.ByaparKarobar.entity.User;

public interface UserService {

    Response registerUser(UserDto registrationRequest);

    Response loginUser(LoginRequest loginRequest);

    Response getAllUsers();

    User getLoginUser();

    Response getUserInfoAndOrderHistory();
}
