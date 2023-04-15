import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { handleError } from '../helpers/handleError';
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL: string = 'product';

  constructor(
    private http: HttpClient
  ) { }

  setProductId(id: string) {
    if (id) {
      localStorage.setItem('p_id', id);
    }
  }

  getProductId(): string {
    const id = localStorage.getItem('p_id');

    return id ?? '';
  }

  removeProductId() {
    localStorage.removeItem('p_id');
  }

  createProduct(product: any, sell_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);
    
    const body = {
      ...product,
      seller_id: sell_id
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

  getAllProduct(): Observable<any> {
    return this.http.get<any>(
      `${api.baseURL}${this.URL}`
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getProductsBySellerId(sell_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.get<any>(
      `${api.baseURL}${this.URL}/search/seller/${sell_id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getProductByNotSellerId(sell_id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.get<any>(
      `${api.baseURL}${this.URL}/allproducts/${sell_id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(
      `${api.baseURL}${this.URL}/search/product_id/${id}`
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  searchProductByName(name: string): Observable<any> {
    return this.http.get<any>(
      `${api.baseURL}${this.URL}/search/product_name/${name}`
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateProductById(data: any, id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.put<any>(
      `${api.baseURL}${this.URL}/update/${id}`,
      data,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  deleteProductById(id: string, token: string): Observable<any> {
    const headerOptions = new HttpHeaders()
      .set(api.authHead, token);

    return this.http.delete<any>(
      `${api.baseURL}${this.URL}/delete/${id}`,
      { headers: headerOptions }
    ).pipe(
      retry(1),
      catchError(handleError)
    );
  }
}
