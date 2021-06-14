import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { MainContainerComponent } from './components';
import { SharedModule } from '../shared';
import {HttpInterceptorProviders, TestHttpInterceptorProviders} from './interceptors';
import { ApiService, JwtService } from './services';
import { PropertyUpdateFormComponent } from './components';
import { AdminGuard, AuthGuard, NoAuthGuard, ResetPwdGuard } from './guards';
import { LayoutModule } from '@angular/cdk/layout';
import { GlobalErrorHandler } from './global-error-handler';
import {ReactiveComponentModule} from "@ngrx/component";


@NgModule({
    declarations: [MainContainerComponent, PropertyUpdateFormComponent],
    imports: [
        SharedModule,
        LayoutModule,
        ReactiveComponentModule,
    ],
    providers: [
        HttpInterceptorProviders,
        //TestHttpInterceptorProviders,
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
        ApiService,
        JwtService,
        AdminGuard,
        AuthGuard,
        NoAuthGuard,
        ResetPwdGuard
    ],
    entryComponents: [
        PropertyUpdateFormComponent
    ],
    exports: [
        MainContainerComponent
    ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}

