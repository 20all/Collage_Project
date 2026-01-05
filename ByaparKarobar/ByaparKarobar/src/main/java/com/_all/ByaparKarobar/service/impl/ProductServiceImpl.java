package com._all.ByaparKarobar.service.impl;

import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.mapper.EntityDtoMapper;
import com._all.ByaparKarobar.repository.CategoryRepo;
import com._all.ByaparKarobar.repository.ProductRepo;
import com._all.ByaparKarobar.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createProduct(Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {
        return null;
    }

    @Override
    public Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {
        return null;
    }

    @Override
    public Response deleteProduct(Long productId) {
        return null;
    }

    @Override
    public Response getProductById(Long productId) {
        return null;
    }

    @Override
    public Response getAllProduct() {
        return null;
    }

    @Override
    public Response getProductByCategory(Long categoryId) {
        return null;
    }

    @Override
    public Response searchProduct(String searchValue) {
        return null;
    }
}
