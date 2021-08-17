import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && this.userIsLogged()) {
          return throwError(
            'You do not have permission to perform this action.'
          );
        } else if (error.status === 403) {
          return throwError('E-mail or password invalid.');
        } else {
          return throwError(error);
        }
      })
    );
  }

  userIsLogged(): boolean {
    const storageService = this.injector.get(StorageService);
    return Object.keys(storageService.getStorageObject()).length !== 0;
  }
}
