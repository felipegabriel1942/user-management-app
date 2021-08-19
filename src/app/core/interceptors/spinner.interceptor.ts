import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerInterceptor implements HttpInterceptor {
  requests = 0;

  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests++;

    const spinner = this.injector.get(NgxSpinnerService);

    if (this.requests > 0) {
      spinner.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.requests--;

        if (this.requests === 0) {
          spinner.hide();
        }
      })
    );
  }
}
