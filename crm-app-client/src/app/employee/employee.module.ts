import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {EmployeeRoutingModule} from './employee-routing.module';
import {NguCarouselModule} from '@ngu/carousel';
import {EmployeeDetailComponent} from './pages/employee-detail/employee-detail.component';
import {EmployeeEditorDialogComponent} from './components/employee-editor-dialog/employee-editor-dialog.component';
import {TableModule} from "primeng/table";
import {ReactiveComponentModule} from "@ngrx/component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {EmployeeHomeComponent} from './components/employee-home/employee-home.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {FileUploadModule} from "primeng/fileupload";
import {MultiSelectModule} from "primeng/multiselect";
import {BlockUIModule} from "primeng/blockui";

@NgModule({
    declarations: [EmployeeDetailComponent, EmployeeEditorDialogComponent, EmployeeHomeComponent],
    imports: [
        SharedModule,
        EmployeeRoutingModule,
        NguCarouselModule,
        TableModule,
        ReactiveComponentModule,
        ProgressSpinnerModule,
        BreadcrumbModule,
        CardModule,
        TagModule,
        DialogModule,
        InputTextModule,
        CalendarModule,
        ConfirmDialogModule,
        ToastModule,
        FileUploadModule,
        MultiSelectModule,
        BlockUIModule,
        BreadcrumbModule
    ],
    entryComponents: [
        EmployeeEditorDialogComponent
    ]
})
export class EmployeeModule {
}
