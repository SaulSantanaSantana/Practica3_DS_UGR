import { TestBed } from '@angular/core/testing';
import { CalculatorService } from '../app/calculator/service/calculator.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(CalculatorService);
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Basic operations', () => {

      //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
      it('should return the result of an operation', () /* (done) */ => {
        const operation = '30+5';
        const expectedResult = '35';
        let result = service.getResult(operation);
        expect(result).toBe(expectedResult);
        //spyOn(service, 'getResult').and.returnValue(of(expectedResult));

        /*service.getResult(operation).subscribe((result) => {
          expect(result).toBe(expectedResult);
          done();
        });*/
      });

      //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
      it('should return the result of an operation with more than 2 numbers', () /* (done) */ => {
        const operation = '30+5+5';
        const expectedResult = '40';
        let result = service.getResult(operation);
        expect(result).toBe(expectedResult);
        //spyOn(service, 'getResult').and.returnValue(of(expectedResult));

        /*service.getResult(operation).subscribe((result) => {
          expect(result).toBe(expectedResult);
          done();
        });*/
      });

      

      //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
      it('should return the correct result of a division operation', () /* (done) */ => {
        const operation = '30/5';
        const expectedResult = '6';
        let result = service.getResult(operation);
        expect(result).toBe(expectedResult);
        //spyOn(service, 'getResult').and.returnValue(of(expectedResult));

        /*service.getResult(operation).subscribe((result) => {
          expect(result).toBe(expectedResult);
          done();
        });*/
      });

      //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
      it('should return the correct result of a subtraction operation', () /* (done) */ => {
        const operation = '30-5';
        const expectedResult = '25';
        let result = service.getResult(operation);
        expect(result).toBe(expectedResult);
        //spyOn(service, 'getResult').and.returnValue(of(expectedResult));

        /*service.getResult(operation).subscribe((result) => {
          expect(result).toBe(expectedResult);
          done();
        });*/
      });

      //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
      it('should return the correct result of a multiplication operation', () /* (done) */ => {
        const operation = '6x5';
        const expectedResult = '30';
        let result = service.getResult(operation);
        expect(result).toBe(expectedResult);
        //spyOn(service, 'getResult').and.returnValue(of(expectedResult));

        /*service.getResult(operation).subscribe((result) => {
          expect(result).toBe(expectedResult);
          done();
        });*/
      });
      
      //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
      it('should handle division by 0',() /* (done) */ => {
        const operation = '30/0';
        const expectedResult = 'NaN';
        let result = service.getResult(operation);
        expect(result).toBe(expectedResult);
        //spyOn(service, 'getResult').and.returnValue(of(expectedResult));

        /* service.getResult(operation).subscribe((result) => {
          expect(result).toBe(expectedResult);
          done();
        });*/
      });

  });
});
