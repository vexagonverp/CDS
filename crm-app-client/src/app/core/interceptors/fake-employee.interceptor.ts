import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Employee } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FakeEmployeeInterceptor implements HttpInterceptor {

    private employee: Employee = {
        id: '1',
        fullName: 'A'
    }

    private employees:Employee[] = [
        {id:'1', fullName: 'A'},
        {id:'2', fullName: 'B'},
        {id:'B', fullName: 'C'}
    ]

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/employees/1') && request.method === 'GET') {
                console.log('FakeEmployeeInterceptor get /employees/1');
                return of(new HttpResponse({ status: 200, body: this.employee }));
            } else if (request.url.endsWith('/employees') && request.method === 'GET') {
                console.log('FakeEmployeeInterceptor get /employees');
                return of(new HttpResponse({ status: 200, body: this.employees }));
            } 
            // pass through any requests not handled above
            return next.handle(request);
        })) 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
