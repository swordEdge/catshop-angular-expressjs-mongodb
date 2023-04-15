import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry, catchError } from 'rxjs';
import { handleError } from '../helpers/handleError';
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL: string = 'order';

  constructor(
    private http: HttpClient
  ) { }

  getOrderBySellerId(sell_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.get<any>(
      `${api.baseURL}${this.URL}/seller/${sell_id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getOrderByCustomerId(cust_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.get<any>(
      `${api.baseURL}${this.URL}/customer/${cust_id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  createOrder(data: any, cust_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    const body = {
      customer_id: cust_id,
      order_status: 'success',
      items: [
        {
          product_id: data.id,
          quantity: data.quantity
        }
      ]
    };

    return this.http.post<any>(
      `${api.baseURL}${this.URL}/create`,
      body,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }
}