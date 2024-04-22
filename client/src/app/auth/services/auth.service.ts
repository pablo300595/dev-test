import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRes } from '../../models/login-res.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/api/login'
  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<LoginRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    
    return this.http.post<LoginRes>(this.url, { email, password }, httpOptions);
  }
}
