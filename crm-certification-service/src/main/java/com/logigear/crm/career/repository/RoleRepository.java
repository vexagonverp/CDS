package com.logigear.crm.career.repository;

import com.logigear.crm.career.model.Role;
import com.logigear.crm.career.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName roleName);

    boolean existsByName(RoleName roleName);
}
