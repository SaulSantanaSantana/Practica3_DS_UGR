import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  calculate(operation: string, num1: number, num2: number): Observable<string> {
    let endpoint = '';
    switch (operation) {
      case '+':
        endpoint = 'add';
        break;
      case '-':
        endpoint = 'subtract';
        break;
      case 'x':
        endpoint = 'multiply';
        break;
      case '/':
        endpoint = 'divide';
        break;
      default:
        return new Observable((observer) => {
          observer.error('Operación no soportada');
        });
    }

    return this.http
      .get<any>(`${this.url}/${endpoint}`, {
        params: {
          num1: num1.toString(),
          num2: num2.toString(),
        },
      })
      .pipe(
        map((response) => {
          return response.result || 'Error';
        }),
        catchError((error) => {
          console.error('Error al obtener el resultado:', error);
          return 'Error: ' + error.message || 'Unknown error';
        })
      );
  }
  getResult(operation: string): string {
    if (operation.includes('/0')) return 'NaN';
    return (eval(operation.replaceAll('x', '*')) as number).toString();
  }
}
