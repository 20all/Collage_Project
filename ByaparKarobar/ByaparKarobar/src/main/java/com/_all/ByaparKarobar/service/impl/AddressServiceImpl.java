package com._all.ByaparKarobar.service.impl;

import com._all.ByaparKarobar.dto.AddressDto;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.entity.Address;
import com._all.ByaparKarobar.entity.User;
import com._all.ByaparKarobar.repository.AddressRepo;
import com._all.ByaparKarobar.service.interf.AddressService;
import com._all.ByaparKarobar.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepo addressRepo;
    private final UserService userService;


    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {

        User user = userService.getLoginUser();
        Address address = user.getAddress();

        if (address == null) {
            address = new Address();
//            address.setUser(user);
            user.setAddress(address); // bidirectional helper syncs automatically
        }
        if (addressDto.getStreet() != null) address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null) address.setCity(addressDto.getCity());
        if (addressDto.getState() != null) address.setState(addressDto.getState());
        if (addressDto.getZipCode() != null) address.setZipCode(addressDto.getZipCode());
        if (addressDto.getCountry() != null) address.setCountry(addressDto.getCountry());

        // Save only the owning side (Address) is fine, but user side is synced via helper
        addressRepo.save(address);

        String message = (user.getAddress() == null) ? "Address Successfully Created" : "Address successfully Updated";

        return Response.builder()
                .status(200)
                .message(message)
                .build();
    }
}
