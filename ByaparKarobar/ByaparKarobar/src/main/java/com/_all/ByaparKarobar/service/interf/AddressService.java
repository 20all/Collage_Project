package com._all.ByaparKarobar.service.interf;

import com._all.ByaparKarobar.dto.AddressDto;
import com._all.ByaparKarobar.dto.Response;

public interface AddressService {

    Response saveAndUpdateAddress(AddressDto addressDto);
}
