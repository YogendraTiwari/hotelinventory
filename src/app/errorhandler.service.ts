import { ErrorHandler } from '@angular/core';
// Globally handling the error, generic handling
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log(error);
  }
}
