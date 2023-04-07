import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { handleError } from '../helpers/handleError';
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = 'customer';

  constructor(public http: HttpClient) {
  }

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  logout() {
    localStorage.clear();
  }

  login(login: any): Observable<HttpResponse<any>> {
    const body = {
      email: login.email,
      password: login.password
    };

    return this.http.post<any>(
      `${api.baseURL}${this.URL}/login`,
      body,
      { observe: 'response' }
    ).pipe(
      retry(1), 
      catchError(handleError)
    )
  }
}
