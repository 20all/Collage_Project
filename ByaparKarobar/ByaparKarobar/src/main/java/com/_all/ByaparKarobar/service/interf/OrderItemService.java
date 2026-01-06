package com._all.ByaparKarobar.service.interf;

import com._all.ByaparKarobar.dto.OrderRequest;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.enums.OrderStatus;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface OrderItemService {

    Response placeOrder(OrderRequest orderRequest);

    Response updateOrderItemStatus(Long orderItemId, String status);

    Response filterOrderItems(OrderStatus orderStatus, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
}
