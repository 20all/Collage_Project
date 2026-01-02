package com._all.ByaparKarobar.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private BigDecimal totalPrice;

    @OneToMany(fetch = FetchType.LAZY)
    private List<OrderItem> orderItemList;

    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();
}
