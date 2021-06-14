import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainContainerComponent} from './core';
import {AuthGuard} from './core/guards';
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MegaMenuModule} from "primeng/megamenu";
import {MessageModule} from "primeng/message";
import {CardModule} from "primeng/card";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CalendarModule} from "primeng/calendar";
import {SidebarModule} from "primeng/sidebar";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessagesModule} from "primeng/messages";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";


const routes: Routes = [

    {
        path: 'auth', loadChildren: () => import('./auth/auth.module')
            .then(m => m.AuthModule)},
    {
        path: 'dashboard',
        component: MainContainerComponent,
         loadChildren: () => import('./core/components/dashboard/dashboard.module')
                    .then(m => m.DashboardModule)
            ,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee',
        component: MainContainerComponent,
        children: [
            {path: '', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)},
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true, enableTracing: false})
    ],
    exports: [
        RouterModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        ToastModule,
        MegaMenuModule,
        TableModule,
        MessageModule,
        CardModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule,
        MessagesModule

    ]
})
export class AppRoutingModule {
}
