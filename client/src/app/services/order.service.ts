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
}