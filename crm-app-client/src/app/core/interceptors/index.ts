import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { NoCacheInterceptor } from './nocache.interceptor';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { ApiInterceptor } from './api.interceptor';

import { FakeEmployeeInterceptor } from './fake-employee.interceptor';
import { FakeUserInterceptor } from './fake-user.interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoCacheInterceptor, multi: true }
];

export const TestHttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoCacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeEmployeeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeUserInterceptor, multi: true },
];