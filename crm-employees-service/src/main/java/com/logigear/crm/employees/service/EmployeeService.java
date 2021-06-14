package com.logigear.crm.employees.service;

import java.util.*;
import java.util.stream.Collectors;

import com.logigear.crm.employees.response.EmployeeImageResponse;
import com.logigear.crm.employees.util.FileReaderUtil;
import com.logigear.crm.employees.util.FileUploadUtil;
import com.logigear.crm.employees.util.TemporaryLocalStorage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.logigear.crm.employees.model.EmployeeDetails;
import com.logigear.crm.employees.response.EmployeeDetailsDTO;
import com.logigear.crm.employees.mapper.EmployeeMapper;
import com.logigear.crm.employees.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper mapper;
    private final FileUploadUtil fileUploadUtil;
    private final FileReaderUtil fileReaderUtil;

    public EmployeeService(EmployeeRepository employeeRepository,
                           EmployeeMapper mapper,
                           FileUploadUtil fileUploadUtil,
                           FileReaderUtil fileReaderUtil) {
        this.employeeRepository = employeeRepository;
        this.mapper = mapper;
        this.fileUploadUtil = fileUploadUtil;
        this.fileReaderUtil = fileReaderUtil;
    }

    /**
     * Get the employee details associated with the employee id
     *
     * @param id The provided employee id.
     * @return The employee details of the employee with the associated employee id.
     * @throws NoSuchElementException When no employee associated with the provided employee id.
     * @author bang.ngo
     **/
    public EmployeeDetails getEmployeeDetailsByEmployeeId(Long id) {
        return employeeRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    /**
     * Get all employees details from the repository
     *
     * @return The list of employees associated with their EmployeeDetails
     **/
    public List<EmployeeDetails> getEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Update employee details with the provided updated employee
     *
     * @param employee The requested employee to be updated
     * @return The EmployeeDetails of the updated instance of the employee
     * @author bang.ngo
     **/
    public EmployeeDetails updateEmployeeDetails(EmployeeDetailsDTO employee) {
        // Find employee by id, if exists then map the requested employee details to the current employee instance.
        return employeeRepository.findById(employee.getId()).map((emp) -> {
            mapper.updateEmployeeFromDto(employee, emp);
            return employeeRepository.save(emp);
        }).orElseThrow(NoSuchElementException::new);
    }

    /**
     * Get the the encoded base64 image content associated with the provided employee id, if not existed return the
     * default image content (default.png).
     *
     * @param id The provided employee id.
     * @return The encoded base64 image content in string associated with the employee id.
     * @author bang.ngo
     **/
    public String getEncodedBase64ImageByEmployeeId(Long id) {
        return employeeRepository.findById(id).map((emp) -> {
            //Get image name absolute path from Employee instance
            String imageName = emp.getImage();

            //Check if TEMP_IMAGES_STORAGE contains the temp image name, if it exists the immediately return
            // the image encoded in base64.
            if (TemporaryLocalStorage.TEMP_IMAGES_STORAGE.containsKey(imageName)) {
                return TemporaryLocalStorage.TEMP_IMAGES_STORAGE.get(imageName);
            }

            //Read file content from disk with associated image file name
            byte[] fileContent = fileReaderUtil.readFileFromDisk(imageName);

            //Convert image file content to base64 type.
            String encodedString = fileReaderUtil.getConvertedBase64ImageContentFromImageByteContent(fileContent);

            //Map the encoding to the associated image name.
            return TemporaryLocalStorage.mapAndGetEncodedStringToAssociatedImageName(imageName, encodedString);

        }) //If employee is not found based on the given employee id then throw the exception.
                .orElseThrow(NoSuchElementException::new);
    }

    /**
     * Upload the image with the associated employee id to the disk and save the image file name to the database.
     *
     * @param id   The provided employee id.
     * @param file The provided image as multipart-file.
     * @author bang.ngo
     **/
    @Transactional
    public void uploadImageByEmployeeId(MultipartFile file, Long id) {
        //Using .ifPresent to avoid NullPointerException
        employeeRepository.findById(id).map((emp) -> {
            //Given: File name is equal or greater than OS recommendation (255 chars)
            //When: Creating a file with modified name will make the file larger than 255 chars.
            //Then: Bad practices!
            //  String imageName = id + "_" + file.getOriginalFilename();
            String imageAbsoluteName = fileUploadUtil
                    .getPreparedImageFileNameWithAssociatedEmployeeId(String.valueOf(id));
            emp.setImage(imageAbsoluteName);
            fileUploadUtil.writePNGImageFileToDisk(imageAbsoluteName, file);
            return employeeRepository.save(emp);
        }).orElseThrow(NoSuchElementException::new);
    }

    /**
     * Get all the employees profile images from the current repository.
     *
     * @return The list of employee image response which contains employee id and the image content in base64
     * @author bang.ngo
     **/
    public List<EmployeeImageResponse> getAllEmployeesProfileImage() {
        return employeeRepository
                //Get all employee id list
                .findAllEmployeeId()
                //For each employee id in employee id list, set the base64 encoded string to each employee image response
                .map(empIdList -> empIdList.stream().map(empId -> {
                    EmployeeImageResponse eir = new EmployeeImageResponse(empId);
                    eir.setImage(getEncodedBase64ImageByEmployeeId(Long.parseLong(empId)));
                    return eir;
                })
                        //Collect the result as List
                        .collect(Collectors.toList()))
                //If the result is null then throw the exception
                .orElseThrow(NoSuchElementException::new);
    }
}
