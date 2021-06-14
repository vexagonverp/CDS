package com.logigear.crm.career.service;

import com.logigear.crm.career.model.User;
import com.logigear.crm.career.payload.SignUpRequest;

public interface UserService {
	
	/**
	 * Allow the register user info
	 * @return the resulting User object
	 */
	User signup(SignUpRequest signUpRequest);
}
