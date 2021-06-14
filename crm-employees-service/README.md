# Introduction 
CDO-Employees Service
+ Manage (view/update) employees's details.

#  Tool / Library
+ eclipse
+ lombok
+ mapstruct

# Employee Flowchart
![alt text](../doc/CDO-EmployeesService.jpg)

# Admin Flowchart
![alt text](../doc/CDO-EmployeesServiceAdmin.jpg)

# REST API
+ /api/employees/{id}
+ /api/employees/update
+ /api/employees/image/{id}
+ /api/employees/image/upload
+ /api/employees/image (ADMIN)
+ /api/employees (ADMIN)

# How to debug
+ Run "mvn package" to build EmployeeMapperImpl before start debug.
+ Start service "crm-employees-service" as debug mode. The default port is 5002, but you can modify in application.yml.
+ Refer [link](..CDO-Spring-CRM.postman_collection.json) for postman collection to debug this service.