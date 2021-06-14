import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {BehaviorSubject, Observable} from "rxjs";
import {Employee, User} from "../../models";
import {AuthService, EmployeeService} from "../../services";
import {map} from "rxjs/operators";

@Component({
    selector: 'crm-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        MessageService,
        ConfirmationService
    ]
})

export class DashboardComponent implements OnInit {
    breadcrumbItems: MenuItem[];

    user$: Observable<User>;

    currentEmployee$: Observable<Employee>;

    userId: string = "";
    isLoading$ = new BehaviorSubject<boolean>(true);

    constructor(private authService: AuthService,
                private employeeService: EmployeeService,
                private messageService: MessageService,
                private confirmService: ConfirmationService) {
        this.breadcrumbItems = [
            {icon: 'pi pi-home', label: `Dashboard`, routerLink: '/'},
        ];
        this.user$ = this.authService.currentUser;
        this.user$.subscribe(user => {
            this.userId = user.id;
        })
        this.currentEmployee$ = this.employeeService.getEmployee(this.userId);
        this.currentEmployee$.subscribe(() => {
           this.isLoading$.next(false);
        });

    }

    ngOnInit(): void {
    }

}
