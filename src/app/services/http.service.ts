import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  private http = inject(HttpClient);
  
  protected get baseUrl(): string {
    return environment.baseUrl;
  }

  private getHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...customHeaders
    });
  }

  private getParams(params?: { [key: string]: string }): HttpParams {
    return new HttpParams({ fromObject: params });
  }

  private handleError(error: any) {
    console.error('HTTP Error:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }

  // Overloaded GET method
  get<T>(endpoint: string): Observable<T>;
  get<T>(endpoint: string, params?: { [key: string]: string }): Observable<T>;
  get<T>(endpoint: string, params?: { [key: string]: string }, headers?: { [key: string]: string }): Observable<T>;
  get<T>(endpoint: string, params: { [key: string]: string } = {}, headers: { [key: string]: string } = {}): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { headers: this.getHeaders(headers), params: this.getParams(params) })
      .pipe(catchError(this.handleError));
  }

  // Overloaded POST method
  post<T>(endpoint: string, body: any): Observable<T>;
  post<T>(endpoint: string, body: any, headers?: { [key: string]: string }): Observable<T>;
  post<T>(endpoint: string, body: any, params?: { [key: string]: string }, headers?: { [key: string]: string }): Observable<T>;
  post<T>(endpoint: string, body: any, params: { [key: string]: string } = {}, headers: { [key: string]: string } = {}): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, body, { headers: this.getHeaders(headers), params: this.getParams(params) })
      .pipe(catchError(this.handleError));
  }

  // Overloaded PUT method
  put<T>(endpoint: string, body: any): Observable<T>;
  put<T>(endpoint: string, body: any, headers?: { [key: string]: string }): Observable<T>;
  put<T>(endpoint: string, body: any, params?: { [key: string]: string }, headers?: { [key: string]: string }): Observable<T>;
  put<T>(endpoint: string, body: any, params: { [key: string]: string } = {}, headers: { [key: string]: string } = {}): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, body, { headers: this.getHeaders(headers), params: this.getParams(params) })
      .pipe(catchError(this.handleError));
  }

  // Overloaded DELETE method
  delete<T>(endpoint: string): Observable<T>;
  delete<T>(endpoint: string, headers?: { [key: string]: string }): Observable<T>;
  delete<T>(endpoint: string, params?: { [key: string]: string }, headers?: { [key: string]: string }): Observable<T>;
  delete<T>(endpoint: string, params: { [key: string]: string } = {}, headers: { [key: string]: string } = {}): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, { headers: this.getHeaders(headers), params: this.getParams(params) })
      .pipe(catchError(this.handleError));
  }
}
  