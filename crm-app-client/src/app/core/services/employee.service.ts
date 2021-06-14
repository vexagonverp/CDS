import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Employee} from '../models';
import {EmployeeImage} from "../../admin";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private readonly apiService: ApiService) {

    }

    getEmployees(): Observable<Employee[]> {
        return this.apiService.get("/employees");
    }

    getEmployee(id: string): Observable<Employee> {
        return this.apiService.get(`/employees/${id}`);
    }

    updateEmployee(id: string, data: any): Observable<Employee> {
        return this.apiService.patch(`/employees/update`, data);
    }
    
    getAllEmployeesProfileImage(): Observable<EmployeeImage[]> {
        return this.apiService.get(`/employees/image`);
    }

    getEmployeeProfileImage(id: string): Observable<string> {
        return this.apiService.getAsText(`/employees/image/${id}`);
    }

    uploadEmployeeProfileImage(data: any): Observable<string> {
        return this.apiService.post(`/employees/image/upload`, data);
    }
}
