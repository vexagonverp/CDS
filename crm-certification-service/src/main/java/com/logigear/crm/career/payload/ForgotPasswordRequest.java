package com.logigear.crm.career.payload;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordRequest {
	
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;
}
