package com.logigear.crm.employees.controller;

import java.util.List;

import com.logigear.crm.employees.response.EmployeeImageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.logigear.crm.employees.model.EmployeeDetails;
import com.logigear.crm.employees.response.EmployeeDetailsDTO;
import com.logigear.crm.employees.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * All users must be authenticated before using this method.
     * Get an employee by using the provided employee id in Long datatype.
     *
     * @param id The provided employee id
     * @return An employee associated with provided employee id.
     */
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDetails> getDetails(@PathVariable("id") Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeDetailsByEmployeeId(id));
    }

    /**
     * Users must have ADMIN role before using this method.
     * Get all employees.
     *
     * @return A list of current employees.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<EmployeeDetails>> getAll() {
        return ResponseEntity.ok(employeeService.getEmployees());
    }

    /**
     * Users must have ADMIN role before using this method.
     * (Partially) update the current employee details.
     *
     * @param req The provided employee partial information.
     * @return Current details of an employee
     */
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping(value = "update", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmployeeDetails> updateEmployeeDetails(@RequestBody EmployeeDetailsDTO req) {
        return ResponseEntity.ok(employeeService.updateEmployeeDetails(req));
    }

    /**
     * All users must be authenticated before using this method.
     * Get an employee's profile picture based on their provided employee id.
     *
     * @param id The provided employee id
     * @return Image properties represented in image name, image type and base64 encoded image data.
     */
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping(path = {"image/{id}"})
    public ResponseEntity<String> getImage(@PathVariable("id") Long id) {
        return ResponseEntity.ok(employeeService.getEncodedBase64ImageByEmployeeId(id));
    }

    /**
     * All users must be authenticated before using this method.
     * Update an employee's profile picture based on their provided employee id.
     *
     * @param file The provided picture which is from the client.
     * @param id   The provided employee id associated with the image.
     * @return Image properties represented in image name, image type and base64 encoded image data.
     */
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping("image/upload")
    //Please response as ResponseEntity not BodyBuilder -> If not, result into 406 Not Acceptable
    //Because Spring doesn't know how to parse!
    public ResponseEntity<HttpStatus> uploadImage(@RequestPart("imageFile") MultipartFile file,
                                                  @RequestParam("id") Long id) {
        employeeService.uploadImageByEmployeeId(file, id);
        return ResponseEntity.ok().build();
    }

    /**
     * Users must have ADMIN role before using this method.
     * Get all employees profile images associated with their id.
     *
     * @return The list of EmployeeImageResponse which contains employee id and base64 encoded image data.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("image")
    public ResponseEntity<List<EmployeeImageResponse>> getAllEmployeesProfileImage() {
        return ResponseEntity.ok(employeeService.getAllEmployeesProfileImage());
    }
}
