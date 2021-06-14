import { Component } from '@angular/core';
import { AuthService } from './core';
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LogiGear CRM';
  
  constructor(private authService: AuthService, private primengConfig: PrimeNGConfig) {

  }

  ngOnInit() {
    this.authService.populate();
    this.primengConfig.ripple = true;
  }
}
