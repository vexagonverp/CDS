import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { Router } from '@angular/router';
import { AuthService, EmployeeService } from '../../services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'crm-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  user$: Observable<User>;

  constructor( private router: Router, private authService: AuthService, private employeeService: EmployeeService) {
    this.user$ = this.authService.currentUser;
    this.user$.subscribe(
      user => {
        if(user) {
            window.localStorage.setItem("id", user.id);
            if(this.router.url.includes("dashboard")) {
                this.router.navigate(['dashboard']);
            }
        }
      }
    )  
 }

  ngOnInit(): void {

  }

  onSignOutClicked(): void {
    this.authService.purgeAuth();
    this.router.navigate(['auth', 'signin']);
  }

  onViewProfile(): void {
    this.router.navigate(['/employee']);
  }

  onAdministratorClicked(): void {
    this.router.navigate(['/admin']);
  }


}
