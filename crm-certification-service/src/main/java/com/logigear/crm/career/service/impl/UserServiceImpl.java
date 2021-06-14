package com.logigear.crm.career.service.impl;

import com.logigear.crm.career.exception.AppException;
import com.logigear.crm.career.model.Role;
import com.logigear.crm.career.model.RoleName;
import com.logigear.crm.career.model.User;
import com.logigear.crm.career.payload.SignUpRequest;
import com.logigear.crm.career.repository.RoleRepository;
import com.logigear.crm.career.repository.UserRepository;
import com.logigear.crm.career.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@NoArgsConstructor
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private RoleRepository roleRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
						   RoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.roleRepository = roleRepository;
	}

	@Override
	public User signup(SignUpRequest req) {
		User u = new User();
		u.setEmail(req.getEmail());
		u.setName(req.getName());
		u.setPassword(passwordEncoder.encode(req.getPassword()));
		Role userRole = roleRepository.findByName(RoleName.USER)
				.orElseThrow(() -> new AppException("User Role not set."));
		u.setRoles(Collections.singleton(userRole));
		return userRepository.save(u);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
}
