import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from "../../../shared";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MenubarModule} from "primeng/menubar";
import {PrimeIcons} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {ReactiveComponentModule} from "@ngrx/component";


@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        ToastModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ConfirmDialogModule,
        MenubarModule,
        BreadcrumbModule,
        DropdownModule,
        RippleModule,
        ReactiveComponentModule
    ]
})
export class DashboardModule { }
