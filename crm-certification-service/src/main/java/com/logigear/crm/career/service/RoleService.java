package com.logigear.crm.career.service;

import com.logigear.crm.career.model.Role;
import com.logigear.crm.career.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
	
	private RoleRepository roleRepository; 
	
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}
}
