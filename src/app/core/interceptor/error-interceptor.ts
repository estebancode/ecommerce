import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HTTP_ERRORS_CODE } from './http-code-error';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {
  constructor() {}

  handleError(error: string | Error): void {
    const messageError = this.messageByDefault(error);
    this.printErrorConsole(messageError);
  }

  private messageByDefault(error) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return HTTP_ERRORS_CODE.NO_HAY_INTERNET;
      }
      if (error.hasOwnProperty('status') && !error.error.hasOwnProperty('message')) {
        return this.getErrorHttpCode(error.status);
      }
    }
    return error;
  }

  private printErrorConsole(message): void {
    const response = {
      date: new Date().toLocaleString(),
      path: window.location.href,
      message,
    };
    if (!environment.production) {
      window.console.error('Unexpected error:\n', response);
    }
  }

  public getErrorHttpCode(httpCode: number): string {
    if (HTTP_ERRORS_CODE.hasOwnProperty(httpCode)) {
      return HTTP_ERRORS_CODE.PETICION_FALLIDA;
    }
    return HTTP_ERRORS_CODE[httpCode];
  }
}
