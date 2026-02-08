package com._all.ByaparKarobar.dto;

import com._all.ByaparKarobar.entity.Order;
import com._all.ByaparKarobar.entity.Product;
import com._all.ByaparKarobar.entity.User;
import com._all.ByaparKarobar.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDto {
    private Long id;
    private int quantity;
    private BigDecimal price;
    private String status;
    private UserDto user;
    private ProductDto product;
//    private OrderDto order;
    private LocalDateTime createdAt;
}
