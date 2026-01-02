package com._all.ByaparKarobar.mapper;

import com._all.ByaparKarobar.dto.*;
import com._all.ByaparKarobar.entity.*;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class EntityDtoMapper {

    // user entity to user Dto
    public UserDto mapUserToDtoBasis(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole() != null ? user.getRole().name() : null); // used ternary for null safety
        userDto.setName(user.getName());
        return userDto;
    }

    // Address to Dto basis
    public AddressDto mapAddressToDtoBasis(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setState(address.getState());
        addressDto.setStreet(address.getStreet());
        addressDto.setCity(address.getCity());
        addressDto.setCountry(address.getCountry());
        addressDto.setZipCode(address.getZipCode());
        return addressDto;
    }

    // Category to Dto basis
    public CategoryDto mapCategoryToDtoBasis(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }

    // OrderItem to Dto basis
    public OrderItemDto mapOrderItemToDtoBasis(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());
        orderItemDto.setStatus(orderItem.getStatus() != null ? orderItem.getStatus().name() : null); // used ternary for null safety
        orderItemDto.setCreatedAt(orderItem.getCreatedAt());
        return orderItemDto;
    }

    // Product to Dto basis
    public ProductDto mapProductToDtoBasis(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImageUrl(product.getImageUrl());
        return productDto;
    }

    // User to Dto plus Address
    public UserDto mapUserToDtoPlusAddress(User user) {
        UserDto userDto = mapUserToDtoBasis(user);
        if(user.getAddress() != null) {
            AddressDto addressDto = mapAddressToDtoBasis(user.getAddress());
            userDto.setAddress(addressDto);
        }
        return userDto;
    }

    // OrderItem to Dto plus product
    public OrderItemDto mapOrderItemToDtoPlusProduct(OrderItem orderItem) {
        OrderItemDto orderItemDto = mapOrderItemToDtoBasis(orderItem);
        if(orderItem.getProduct() != null) {
            ProductDto productDto = mapProductToDtoBasis(orderItem.getProduct());
            orderItemDto.setProduct(productDto);
        }
        return orderItemDto;
    }

    // OrderItem to Dto plus product and user
    public OrderItemDto mapOrderItemToDtoPlusProductAndUser(OrderItem orderItem) {
        OrderItemDto orderItemDto = mapOrderItemToDtoPlusProduct(orderItem);
        if(orderItem.getUser() != null) {
            UserDto userDto = mapUserToDtoPlusAddress(orderItem.getUser());
            orderItemDto.setUser(userDto);
        }
        return orderItemDto;
    }

    // User to Dto with Address and Order item history
    public UserDto mapUserToDtoPlusAddressAndOrderHistory(User user) {
        UserDto userDto = mapUserToDtoPlusAddress(user);
        if(user.getOrderItemList() != null && !user.getOrderItemList().isEmpty()) {
            userDto.setOrderItemList(user.getOrderItemList()
                    .stream()
                    .map(this::mapOrderItemToDtoPlusProduct)
                    .collect(Collectors.toList()));
        }
        return userDto;
    }
}
