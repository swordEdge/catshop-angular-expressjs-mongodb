import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry, catchError } from 'rxjs';
import { handleError } from '../helpers/handleError';
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  URL: string = 'seller';

  constructor(
    private http: HttpClient
  ) { }

  setSellerId(id: string | null) {
    if (id) {
      localStorage.setItem('sell_id', id);
    } else {
      localStorage.removeItem('sell_id');
    }
  }

  getSellerId(): string {
    const id = localStorage.getItem('sell_id');
    return id ?? '';
  }

  removeSellerId() {
    localStorage.removeItem('sell_id');
  }

  getSellerByCustomerId(cust_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);
    
    return this.http.get<any>(
      `${api.baseURL}${this.URL}/${cust_id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  signupSeller(sell: any, cust_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    const body = {
      customer_id: cust_id,
      store_name: sell.store_name,
      store_email: sell.store_email,
      store_phone: sell.store_phone,
      store_image: sell.store_image
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

  updateById(data: any, sell_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.put<any>(
      `${api.baseURL}${this.URL}/${sell_id}`,
      data,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  deleteAccount(sell_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.delete<any>(
      `${api.baseURL}${this.URL}/${sell_id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }
}
