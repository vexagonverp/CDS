package com.logigear.crm.employees;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.logigear.crm.employees.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        AppProperties.class
})
public class EmployeesApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeesApplication.class, args);
    }

}
