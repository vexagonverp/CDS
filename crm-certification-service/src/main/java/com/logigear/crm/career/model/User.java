package com.logigear.crm.career.model;

import com.logigear.crm.career.model.audit.DateAudit;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
	@UniqueConstraint(columnNames = {"email"})
})
@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class User extends DateAudit {

	private static final long serialVersionUID = 5644797795094164062L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotBlank
    private String name;
	
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;
	
	@NotBlank
    @Size(max = 100)
    private String password;
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	public User(User user) { 
	    this.id = user.id;
	    this.email = user.email;
	    this.password = user.password;
	    this.roles = user.roles;
	    this.setCreatedAt(user.getCreatedAt());
	    this.setUpdatedAt(user.getUpdatedAt());
	}
}
