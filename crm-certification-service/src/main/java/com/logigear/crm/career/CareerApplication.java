package com.logigear.crm.career;

import com.logigear.crm.career.property.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EnableConfigurationProperties({
        AppProperties.class
})
@EntityScan(basePackageClasses = {
        CareerApplication.class,
        Jsr310JpaConverters.class
})
public class CareerApplication {
    public static void main(String[] args) {
        SpringApplication.run(CareerApplication.class, args);
    }
}
