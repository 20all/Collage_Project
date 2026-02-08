package com._all.ByaparKarobar.entity;

import com._all.ByaparKarobar.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
//@Builder
@NoArgsConstructor
//@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Email is required")
    private String name;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @Column(name = "phone_number", nullable = false)
    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<OrderItem> orderItemList;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Address address;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // --------------------
    // Bidirectional helper
    // --------------------
    public void setAddress(Address address) {
        this.address = address;
        if (address != null) {
            address.setUser(this);
        }
    }

    // --------------------
    // JPA-safe equality
    // --------------------
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User other)) return false;
        return id != null && id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
