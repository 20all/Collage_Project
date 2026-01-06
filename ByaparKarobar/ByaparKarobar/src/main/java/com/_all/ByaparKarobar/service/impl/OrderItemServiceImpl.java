package com._all.ByaparKarobar.service.impl;

import com._all.ByaparKarobar.dto.OrderItemDto;
import com._all.ByaparKarobar.dto.OrderRequest;
import com._all.ByaparKarobar.dto.Response;
import com._all.ByaparKarobar.entity.Order;
import com._all.ByaparKarobar.entity.OrderItem;
import com._all.ByaparKarobar.entity.Product;
import com._all.ByaparKarobar.entity.User;
import com._all.ByaparKarobar.enums.OrderStatus;
import com._all.ByaparKarobar.exception.NotFoundException;
import com._all.ByaparKarobar.mapper.EntityDtoMapper;
import com._all.ByaparKarobar.repository.OrderItemRepo;
import com._all.ByaparKarobar.repository.OrderRepo;
import com._all.ByaparKarobar.repository.ProductRepo;
import com._all.ByaparKarobar.service.interf.OrderItemService;
import com._all.ByaparKarobar.service.interf.UserService;
import com._all.ByaparKarobar.specification.OrderItemSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final ProductRepo productRepo;
    private final UserService userService;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response placeOrder(OrderRequest orderRequest) {

        User user = userService.getLoginUser();

        // map orderrequest items to order entities

        List<OrderItem> orderItemList = orderRequest.getItems().stream().map(orderItemRequest -> {
            Product product = productRepo.findById(orderItemRequest.getProductId())
                    .orElseThrow(()-> new NotFoundException("Product Not Found!"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemRequest.getQuantity());
            orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(orderItemRequest.getQuantity())));// set price according to quantity of products
            orderItem.setStatus(OrderStatus.PENDING);
            orderItem.setUser(user);
            return orderItem;
        }).toList();

        // calculate the total price
        BigDecimal totalPrice = orderRequest.getTotalPrice() != null && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0
                ? orderRequest.getTotalPrice()
                : orderItemList.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);

        // create order entity
        Order order = new Order();
        order.setOrderItemList(orderItemList);
        order.setTotalPrice(totalPrice);

        // set the order reference in each order item
        orderItemList.forEach(orderItem -> orderItem.setOrder(order));

        orderRepo.save(order);
        return Response.builder()
                .status(200)
                .message("Order was successfully placed")
                .build();
    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {

        OrderItem orderItem = orderItemRepo.findById(orderItemId)
                .orElseThrow(()->new NotFoundException("Order item Not Found!"));

        orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        orderItemRepo.save(orderItem);
        return Response.builder()
                .status(200)
                .message("Order was Updated successfully")
                .build();
    }

    @Override
    public Response filterOrderItems(OrderStatus orderStatus, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable) {

        Specification<OrderItem> specification = Specification.where(OrderItemSpecification.hasStatus(orderStatus))
                .and(OrderItemSpecification.createdBetween(startDate, endDate))
                .and(OrderItemSpecification.hasItemId(itemId));

        Page<OrderItem> orderItemPage = orderItemRepo.findAll(specification, pageable);

        if (orderItemPage.isEmpty()) {
            throw new NotFoundException("No order Found!");
        }

        List<OrderItemDto> orderItemDtoList = orderItemPage.getContent().stream()
                .map(entityDtoMapper::mapOrderItemToDtoPlusProductAndUser)
                .toList();
        return Response.builder()
                .status(200)
                .orderItemList(orderItemDtoList)
                .totalPage(orderItemPage.getTotalPages())
                .totalElement(orderItemPage.getTotalElements())
                .build();
    }
}
