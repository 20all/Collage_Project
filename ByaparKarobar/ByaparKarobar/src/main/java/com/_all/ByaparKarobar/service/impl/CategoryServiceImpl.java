package com._all.ByaparKarobar.service.impl;

import com._all.ByaparKarobar.dto.CategoryDto;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.entity.Category;
import com._all.ByaparKarobar.exception.NotFoundException;
import com._all.ByaparKarobar.mapper.EntityDtoMapper;
import com._all.ByaparKarobar.repository.CategoryRepo;
import com._all.ByaparKarobar.service.interf.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createCategory(CategoryDto categoryRequest) {

        Category category = new Category();
        category.setName(categoryRequest.getName());
        categoryRepo.save(category);
        return Response.builder()
                .status(200)
                .message("Category Created Successfully")
                .build();
    }

    @Override
    public Response updateCategory(Long categoryId, CategoryDto categoryRequest) {
        Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not Found!"));
        category.setName(categoryRequest.getName());
        categoryRepo.save(category);
        return Response.builder()
                .status(200)
                .message("Category Updated Successfully")
                .build();
    }

    @Override
    public Response getAllCategory() {

        List<Category> categories = categoryRepo.findAll();
        List<CategoryDto> categoryDtosList = categories.stream()
                .map(entityDtoMapper::mapCategoryToDtoBasis)
                .toList();
        return Response.builder()
                .status(200)
                .categoryList(categoryDtosList)
                .build();
    }

    @Override
    public Response getCategoryById(Long categoryId) {

        Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not Found!"));
        CategoryDto categoryDto = entityDtoMapper.mapCategoryToDtoBasis(category);
        return Response.builder()
                .status(200)
                .category(categoryDto)
                .build();
    }

    @Override
    public Response deleteCategory(Long categoryId) {

        Category category = categoryRepo.findById(categoryId).orElseThrow(()-> new NotFoundException("Category not Found!"));
        categoryRepo.delete(category);
        return Response.builder()
                .status(200)
                .message("Category deleted Successfully.")
                .build();
    }
}
