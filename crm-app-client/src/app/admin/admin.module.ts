import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AdminComponent} from './pages/admin.component';
import {AdminRoutingModule} from './admin.routing.module';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {ImageUploadItemComponent} from './components/image-upload-item/image-upload-item.component';
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ReactiveComponentModule} from "@ngrx/component";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {GalleriaModule} from "primeng/galleria";
import {EmployeeDetailComponent} from "./pages";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
    declarations: [
        AdminComponent,
        ImageUploaderComponent,
        ImageUploadItemComponent,
        EmployeeDetailComponent
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        CardModule,
        TagModule,
        ReactiveComponentModule,
        DialogModule,
        InputTextModule,
        CalendarModule,
        GalleriaModule,
        TableModule,
        ToastModule,
        ConfirmDialogModule,
        BreadcrumbModule
    ],
    entryComponents: [],
})
export class AdminModule {
}
