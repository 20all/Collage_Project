package com._all.ByaparKarobar.service.impl;

import com._all.ByaparKarobar.dto.ProductDto;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.entity.Category;
import com._all.ByaparKarobar.entity.Product;
import com._all.ByaparKarobar.exception.NotFoundException;
import com._all.ByaparKarobar.mapper.EntityDtoMapper;
import com._all.ByaparKarobar.repository.CategoryRepo;
import com._all.ByaparKarobar.repository.ProductRepo;
import com._all.ByaparKarobar.service.cloudinary.CloudinaryService;
import com._all.ByaparKarobar.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public Response createProduct(Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {

        Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not Found!"));
        String productImageUrl = cloudinaryService.uploadImage(image);

        Product product = new Product();
        product.setCategory(category);
        product.setPrice(price);
        product.setName(name);
        product.setDescription(description);
        product.setImageUrl(productImageUrl);

        productRepo.save(product);
        return Response.builder()
                .status(200)
                .message("Product successfully Created")
                .build();
    }

    @Override
    public Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {

        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product not Found!"));

        Category category = null;
        String productImageUrl = null;
        if (categoryId != null) {
            category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not Found!"));
        }
        if (image != null && !image.isEmpty()) {
            productImageUrl = cloudinaryService.uploadImage(image);
        }

        if (category != null) product.setCategory(category);
        if (name != null) product.setName(name);
        if (price != null) product.setPrice(price);
        if (description  != null) product.setDescription(description);
        if (productImageUrl != null) product.setImageUrl(productImageUrl);

        productRepo.save(product);
        return Response.builder()
                .status(200)
                .message("Product Updated Successfully")
                .build();
    }

    @Override
    public Response deleteProduct(Long productId) {

        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product not Found!"));
        productRepo.delete(product);
        return Response.builder()
                .status(200)
                .message("Product Deleted successfully")
                .build();
    }

    @Override
    public Response getProductById(Long productId) {

        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product not Found!"));
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasis(product);

        return Response.builder()
                .status(200)
                .product(productDto)
                .build();
    }

    @Override
    public Response getAllProduct() {

//        List<Product> productList = productRepo.findAll();
//        List<ProductDto> productDtoList = productList.stream()
//                .map(entityDtoMapper::mapProductToDtoBasis)
//                .toList();

        List<ProductDto> productDtoList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasis)
                .toList();

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

    @Override
    public Response getProductByCategory(Long categoryId) {

        List<Product> productList = productRepo.findByCategoryId(categoryId);
        if (productList.isEmpty()) {
            throw new NotFoundException("No products found in this category");
        }
        List<ProductDto> productDtoList = productList.stream()
                .map(entityDtoMapper::mapProductToDtoBasis)
                .toList();
        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

    @Override
    public Response searchProduct(String searchValue) {

        List<Product> products = productRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);

        if (products.isEmpty()) {
            throw new NotFoundException("No product Found");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasis)
                .toList();

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }
}
