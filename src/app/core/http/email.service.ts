import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/shared/models/email.model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendToUser(email: Email): Observable<any> {
    return this.http.post<any>('email', email);
  }

  sendToAllAdmins(email: Email): Observable<any> {
    return this.http.post<any>('email/admins', email);
  }
}
