import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: Error | HttpErrorResponse): void {
    const notificationService = this.injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      if (error.error.errors) {
        const errors = error.error.errors as string[];

        errors.forEach((e) => {
          this.zone.run(() => notificationService.error(e));
        });
      }
    } else {
      this.zone.run(() => notificationService.error(error.toString()));
    }
  }
}
