import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  save(user: User): Observable<User> {
    return this.http.post<User>('user', user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`user/${user.id}`, user);
  }

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(`user/${page}/users`);
  }
}
