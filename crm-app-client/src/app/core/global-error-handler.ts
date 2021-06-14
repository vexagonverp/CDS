import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggingService, ErrorService } from './services';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler extends ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor( @Inject(Injector) private readonly injector: Injector) {
        super();
    }

    private get toastrService(): ToastrService {
        return this.injector.get<ToastrService>(ToastrService);
    }

    private get loggingService(): LoggingService {
        return this.injector.get<LoggingService>(LoggingService);
    }

    private get errorService(): ErrorService {
        return this.injector.get<ErrorService>(ErrorService);
    }

    handleError(error: Error | HttpErrorResponse) {

        let message: string;
        let stackTrace: string;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = this.errorService.getServerMessage(error);
            stackTrace = this.errorService.getServerStack(error);
            let errMsg: string = "";
            if (message.includes("/api/auth/signin")) {
                errMsg = "Invalid credentials! Please try again!";
            }
            this.toastrService.error(errMsg === "" ? message : errMsg, undefined, { onActivateTick: true })

        } else {
            // Client Error
            message = this.errorService.getClientMessage(error);
            stackTrace = this.errorService.getClientStack(error);
            this.toastrService.error(message, undefined, { onActivateTick: true })
        }

        // Always log errors
        this.loggingService.logError(message, stackTrace);
    }
}