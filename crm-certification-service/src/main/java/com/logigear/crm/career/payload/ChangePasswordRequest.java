package com.logigear.crm.career.payload;

import com.logigear.crm.career.validation.Password;
import lombok.*;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
	@Password
	private String oldPassword;

	@Password
	private String password;
}
