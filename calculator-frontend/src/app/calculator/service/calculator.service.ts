import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Verificar si un número es primo
  isPrime(number: number): Observable<any> {
    const params = new HttpParams().set('number', number.toString());
    return this.http.get(`${this.apiUrl}/is_prime`, { params });
  }

  // Calcular la raíz cuadrada
  squareRoot(number: number): Observable<any> {
    const params = new HttpParams().set('number', number.toString());
    return this.http.get(`${this.apiUrl}/square_root`, { params });
  }

  // Suma
  add(num1: number, num2: number): Observable<any> {
    const params = new HttpParams()
      .set('num1', num1.toString())
      .set('num2', num2.toString());
    return this.http.get(`${this.apiUrl}/add`, { params });
  }

  // Resta
  subtract(num1: number, num2: number): Observable<any> {
    const params = new HttpParams()
      .set('num1', num1.toString())
      .set('num2', num2.toString());
    return this.http.get(`${this.apiUrl}/subtract`, { params });
  }

  // Multiplicación
  multiply(num1: number, num2: number): Observable<any> {
    const params = new HttpParams()
      .set('num1', num1.toString())
      .set('num2', num2.toString());
    return this.http.get(`${this.apiUrl}/multiply`, { params });
  }

  // División
  divide(num1: number, num2: number): Observable<any> {
    const params = new HttpParams()
      .set('num1', num1.toString())
      .set('num2', num2.toString());
    return this.http.get(`${this.apiUrl}/divide`, { params });
  }

  // División entera
  integerDivide(num1: number, num2: number): Observable<any> {
    const params = new HttpParams()
      .set('num1', num1.toString())
      .set('num2', num2.toString());
    return this.http.get(`${this.apiUrl}/integer_divide`, { params });
  }
}
