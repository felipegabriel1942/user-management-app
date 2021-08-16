import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(user: User): Observable<any> {
    return this.http.post('login', user, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
