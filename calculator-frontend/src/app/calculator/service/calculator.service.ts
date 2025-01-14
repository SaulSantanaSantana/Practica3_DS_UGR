import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CalculatorService {
  private url = 'http://localhost:8080/calculator';

  constructor(/*private http: HttpClient*/) {}
  //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
  /*getResult(operation: string): Observable<string> {
    return this.http.post<any>(this.url, { operation }).pipe(
      map((response) => {
        return response.result || 'Error';
      }),
      catchError((error) => {
        console.error('Error al obtener el resultado:', error);
        return 'Error: ' + error.message || 'Unknown error';
      })
    );
  }*/
  getResult(operation: string): string {
    if(operation.includes("/0")) return "NaN";
    return (eval(operation) as number).toString();
  }
}

