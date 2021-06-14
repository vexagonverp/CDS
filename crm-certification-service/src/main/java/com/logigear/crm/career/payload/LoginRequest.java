package com.logigear.crm.career.payload;

import com.logigear.crm.career.validation.Password;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter @Setter @ToString
public class LoginRequest {

	@NotBlank
	private String email;
	
	@Password
    private String password;
}
