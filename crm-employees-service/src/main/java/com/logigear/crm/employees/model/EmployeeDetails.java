package com.logigear.crm.employees.model;

import java.time.Instant;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "employeesdetails", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id"})
})
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Size(max = 40)
    @Column(name = "full_name")
    private String fullName;

    // Personal Info
    @Column(name = "birth_day")
    private Instant birthDay;

    @NotBlank
    @Column(name = "place_of_birth")
    private String placeOfBirth;

    @NotBlank
    @Size(max = 10)
    @Column(name = "gender")
    private String gender;

    @Column(name = "id_number")
    private Long idNumber;

    @Column(name = "issue_date")
    private Instant issueDate;

    @NotBlank
    @Size(max = 20)
    @Column(name = "race")
    private String race;

    @Size(max = 20)
    @Column(name = "religion")
    private String religion;

    @Column(name = "married_status")
    private String marriedStatus;

    @Column(name = "cell_phone")
    private Long cellPhone;

    @Column(name = "taxid")
    private Long taxID;

    @Column(name = "insurance_book_no")
    private Long insuranceBookNo;

    @Column(name = "address")
    private String address;

    // Payment info
    @NotBlank
    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_account")
    private Long bankAccount;

    @Column(name = "image")
    private String image;

    // Education
    @NotEmpty
    @Column(name = "degree")
    private String degree;

    @Column(name = "major")
    private String major;

    // At company
    @Column(name = "employeeid")
    private int employeeID;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "contracted_date")
    private Instant contractedDate;

    @NotBlank
    @Column(name = "department")
    private String department;

    @Column(name = "job_title")
    private String jobTitle;

    // ?? id of Manager
    @Column(name = "manager")
    private Long manager;
}
