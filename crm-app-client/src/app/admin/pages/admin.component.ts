import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {AuthService, Employee, EmployeeService, User} from "../../core";
import {Router} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";


export interface EmployeeImage {
    id: string;
    encodedImage: string;
}

@Component({
    selector: 'crm-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    employees$: Observable<Employee[]>;
    displayModal: boolean;
    employee$: Observable<Employee>;
    user$: Observable<User>;
    employeesImage$: Observable<EmployeeImage[]>

    combined$: Observable<any>;


    constructor(private employeeService: EmployeeService,
                private authService: AuthService,
                private router: Router) {
        this.combined$ = new Observable();
        this.employeesImage$ = this.employeeService.getAllEmployeesProfileImage();
        this.displayModal = false;
        this.employee$ = new Observable<Employee>();
        this.employees$ = employeeService.getEmployees().pipe(map((empList) => {
            return empList.map((emp) => {
                let newEmp: Employee;
                this.employeesImage$.toPromise().then((empImgList) => {
                    empImgList.forEach((empImg) => {
                        newEmp = {
                            ...emp,
                            image: empImgList.filter(empImg => empImg.id === emp.id)[0].encodedImage
                        };
                    })
                });
                // @ts-ignore
                return newEmp;

            });

             /*empList.map((emp) => {
                this.employeesImage$.pipe(map(empImgList => {
                    emp.image = empImgList.filter(empImg => empImg.id === emp.id)[0].encodedImage;
                    console.warn(emp.image);
                    return empImgList;
                }))
            });*/
        }));
        this.user$ = authService.currentUser;

    }

    ngOnInit(): void {
    }

    showEmpInformation(id: string) {
        this.employee$ = this.employeeService.getEmployee(id);
        this.displayModal = true;
    }

    onSignInClicked(): void {
        console.log("onSignInClicked");
        this.router.navigate(['auth', 'signin'], { queryParams: { redirectUrl: this.router.url }});
    }

    onSignOutClicked(): void {
        this.authService.purgeAuth();
        this.router.navigate(['auth', 'signin']);
    }

    onViewProfile(user:User): void {
        this.router.navigate(['/employee', user.id]);
    }

    onAdministratorClicked(): void {
        this.router.navigate(['/admin']);
    }

}
