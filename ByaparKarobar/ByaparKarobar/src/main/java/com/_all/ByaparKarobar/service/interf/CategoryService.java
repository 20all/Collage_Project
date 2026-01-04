package com._all.ByaparKarobar.service.interf;

import com._all.ByaparKarobar.dto.CategoryDto;
import com._all.ByaparKarobar.dto.Response;

public interface CategoryService {

    Response createCategory(CategoryDto categoryRequest);

    Response updateCategory(Long categoryId, CategoryDto categoryRequest);

    Response getAllCategory();

    Response getCategoryById(Long categoryId);

    Response deleteCategory(Long categoryId);
}
