import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry, catchError } from 'rxjs';
import { handleError } from '../helpers/handleError';
import { ICustomer } from '../models/customer.model';
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL: string = 'customer';

  constructor(public http: HttpClient) { }

  setCustomerId(id: string | null) {
    if (id) {
      localStorage.setItem('cust_id', id);
    } else {
      localStorage.removeItem('cust_id');
    }
  }

  getCustomerId(): string {
    const id = localStorage.getItem('cust_id');
    return id ? id : '';
  }

  signUpCustomer(cust: any): Observable<ICustomer> {
    const body = {
      firstname: cust.firstname,
      lastname: cust.lastname,
      email: cust.email,
      password: cust.password,
      phone: cust.phone,
      dob: cust.dob,
      image: cust.image
    };

    return this.http.post<ICustomer>(
      `${api.baseURL}${this.URL}/signup`,
      body
    ).pipe(
      retry(1), 
      catchError(handleError)
    );
  }

  getCustomerById(id: string, token: string = ''): Observable<any> {
    const headersOption = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.get<any>(
      `${api.baseURL}${this.URL}/${id}`,
      { headers: headersOption }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateCustomerId(id: string, update: any, token: string): Observable<any> {
    const headersOption = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.put<any>(
      `${api.baseURL}${this.URL}/${id}`,
      update,
      { headers: headersOption }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }
}
