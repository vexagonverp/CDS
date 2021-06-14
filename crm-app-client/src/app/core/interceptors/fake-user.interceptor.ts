import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models';

@Injectable()
export class FakeUserInterceptor implements HttpInterceptor {

    /*
    private users:User[] = [
      {id:'1', email: 'sti2k.hai.ly@gmail.com', name: 'Samson', roles: ['ADMIN'], unverified: false, blocked: false, goodUser: true, goodAdmin: true},
      {id:'2', email: 'do.tran@gmail.com', name: 'DoTran', roles: ['USER'], unverified: false, blocked: false, goodUser: true, goodAdmin: false},
    ]*/

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let s = localStorage.getItem('users');
        let users: any[] = [];
        if(s) {
            users = JSON.parse(s) || [];
        }

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/auth/signin') && request.method === 'POST') {
                console.log('FakeUserInterceptor for login');
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.email === request.body.email && user.pwd === request.body.pwd;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {id:user.id, email: user.email, name: user.name, roles: ['USER'], unverified: false, blocked: false, goodUser: true, goodAdmin: false};
                    let headers = new HttpHeaders({
                      'OT-Authorization': "Bearer fake-jwt-token"
                    })
                    let httpResponse = new HttpResponse({ status: 200, headers: headers, body: body });
                   

                    return of(httpResponse);
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            
            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorized' } });
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
              console.log('FakeUserInterceptor for getting user with id');
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    console.log('FakeUserInterceptor for getting user with urlParts', urlParts);
                    console.log('FakeUserInterceptor for getting user with id1', id);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
                    
                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorized' } });
                }
            }

            // register user
            if (request.url.endsWith('/api/auth/signup') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                let body = {id:newUser.id, email: newUser.email, name: newUser.name, roles: ['USER'], unverified: false, blocked: false, goodUser: true, goodAdmin: false};
                let httpResponse = new HttpResponse({ status: 200, body: body });
                httpResponse.headers.append('OT-Authorization', "Bearer fake-jwt-token")

                // respond 200 OK
                return of(httpResponse);
            }

            /*
            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }*/

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}