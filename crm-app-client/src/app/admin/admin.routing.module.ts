import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent, EmployeeDetailComponent} from './pages';

const routes: Routes = [
    {
        path: 'employees',
        component: AdminComponent
    },
    {
        path: 'employees/:id',
        component: EmployeeDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
