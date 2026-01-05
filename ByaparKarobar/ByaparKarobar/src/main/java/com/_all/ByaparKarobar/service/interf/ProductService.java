package com._all.ByaparKarobar.service.interf;

import com._all.ByaparKarobar.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public interface ProductService {

    Response createProduct(Long categoryId, MultipartFile image, String name, String description, BigDecimal price);

    Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description, BigDecimal price);

    Response deleteProduct(Long productId);

    Response getProductById(Long productId);

    Response getAllProduct();

    Response getProductByCategory(Long categoryId);

    Response searchProduct(String searchValue);


}
