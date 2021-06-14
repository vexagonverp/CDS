package com.logigear.crm.career.startup;

import com.logigear.crm.career.exception.AppException;
import com.logigear.crm.career.model.Role;
import com.logigear.crm.career.model.RoleName;
import com.logigear.crm.career.model.User;
import com.logigear.crm.career.property.AppProperties;
import com.logigear.crm.career.repository.RoleRepository;
import com.logigear.crm.career.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@Configuration
public class StartupConfig {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AppProperties properties;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StartupConfig(UserRepository userRepository, RoleRepository roleRepository,
                         AppProperties properties, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.properties = properties;
        this.passwordEncoder = passwordEncoder;
    }

    @EventListener
    public void afterApplicationReady(ApplicationReadyEvent event) {

        if (!roleRepository.existsByName(RoleName.ADMIN)) {
            final Role adminRole = new Role();
            adminRole.setName(RoleName.ADMIN);
            roleRepository.save(adminRole);
        }

        if (!roleRepository.existsByName(RoleName.USER)) {
            final Role userRole = new Role();
            userRole.setName(RoleName.USER);
            roleRepository.save(userRole);
        }

        if (!userRepository.existsByEmail(properties.getAdmin().getEmail())) {
            final User user = new User();
            user.setEmail(properties.getAdmin().getEmail());
            user.setName(properties.getAdmin().getName());
            user.setPassword(passwordEncoder.encode(properties.getAdmin().getPassword()));
            Role userRole = roleRepository.findByName(RoleName.ADMIN)
                    .orElseThrow(() -> new AppException("Admin Role not set."));
            user.setRoles(Collections.singleton(userRole));
            userRepository.save(user);
        }
    }
}
