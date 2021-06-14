package com.logigear.crm.career.controller;

import com.logigear.crm.career.model.User;
import com.logigear.crm.career.payload.LoginRequest;
import com.logigear.crm.career.payload.SignUpRequest;
import com.logigear.crm.career.payload.UserResponse;
import com.logigear.crm.career.security.JwtProvider;
import com.logigear.crm.career.service.UserService;
import com.logigear.crm.career.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider tokenProvider;
	private final UserService userService;

	@Autowired
	public AuthController(AuthenticationManager authenticationManager, JwtProvider tokenProvider,
						  UserService userService) {
		this.authenticationManager = authenticationManager;
		this.tokenProvider = tokenProvider;
		this.userService = userService;
	}

	@PostMapping("signin")
	public ResponseEntity<UserResponse> authenticateUser(@Valid @RequestBody LoginRequest req) {
		Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                		req.getEmail(),
                		req.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User)authentication.getPrincipal();
        String token = tokenProvider.generateToken(user);
        
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(AppConstants.TOKEN_RESPONSE_HEADER_NAME, AppConstants.TOKEN_PREFIX + token);
        return ResponseEntity.ok()
        		.headers(responseHeaders)
        		.body(new UserResponse((User)authentication.getPrincipal()));
	}
	
    @PostMapping("signup")
	public ResponseEntity<UserResponse> signup(@Valid @RequestBody SignUpRequest req) {
    	
    	User user = userService.signup(req);
    	String token = tokenProvider.generateToken(user);
    	HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(AppConstants.TOKEN_RESPONSE_HEADER_NAME, AppConstants.TOKEN_PREFIX + token);
        return ResponseEntity.status(HttpStatus.CREATED)
         		.headers(responseHeaders)
         		.body(new UserResponse(user));
	}

	/**
	 * The user can recover their user account by providing the associated email with that acount.
	* @author bang.ngo
	 * @param email The provided email associated with the user account.
	 * @return The successful message after recovering.
	 **/
	@GetMapping("forgotpwd")
	public ResponseEntity<?> forgotPassword(@Valid @RequestParam("email") String email) {
		System.out.println("To-be implemented!");
		return ResponseEntity.ok().build();
	}

}
