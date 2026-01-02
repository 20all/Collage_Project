package com._all.ByaparKarobar.repository;

import com._all.ByaparKarobar.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
}
