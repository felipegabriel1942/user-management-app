import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerInterceptor },
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
