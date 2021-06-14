# CDO Application Client

"Capability Development System“ is a sub-module of the internal CRM.
- Current functionalities are:
    + Manage and define career paths.
    + Manage and suggest training plan.
    
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Requirements
- HTML/CSS/JavaScript basic knowledge is a must.
- This project is using `SCSS` by default.
- You must install `Angular CLI` first by using `npm i --g @angular/cli`.
- You must have basic knowledge in developing application with `Angular` framework and at least ECMAScript 6 knowledge for syncing.
- Node Package Manager (NPM) is required for adding dependencies not `Yarn`.
- Experienced with programming in TypeScript and knowing how TypeScript is compiled to VanillaJS.
- Unit testing with Karma/Jasmine.
- Asynchronous programming with Reactive Programming using RxJS (NgRX).
- Basic knowledge in Angular Routing / Authenticating / Authorization.
- Developing web application with UI Integration using PrimeNG library.
- Having knowledge in JWT (JSON Web Token) consuming and providing.
- XMLHttpRequest/Axios/Fetch API for using AJAX (Asynchronous JavaScript and XML) knowledge is a must to be using the built-in HttpClient libray in Angular Framework.

##Project Structure

- src
    - app `Containing Angular source code`
    - assets `Containing the application static files`
    - environments `Containing global variables for developing modes`
    - styles `Containing global SCSS for the application`

    ### `app` folder
  `In each folder, there is a file
  named 'xyz.module.ts' that is for containing
  the required module for using and a file named 'xyz.routing.module.ts'
  for containing the child routing.
  `
- admin `Containing administrator components`
- auth `Containg authentication components`
- core `Containing components to be used for business logic like Services, Guarding, Models`
- employee `Containing employee components`
- home `Containing home components`
- shared `Containing components to be used for global components with pipe and directives`

## Troubleshooting
- Consider changing the file `proxy.conf.json` before starting just to match with the backend's Gateway to get the front-end web application working correctly.
- Please wait for the Angular project to start.
- If you meet any unwanted error in TypeScript files, please consider disabling `TSLint`.

##The below contents is for how to configure and running the front-end project

## Development server

Run `ng serve --proxy-config proxy.conf.json` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
