import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CalculatorService } from '../app/calculator/service/calculator.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


    it('should be created', () => {
      expect(service).toBeTruthy();
    });


    it('should add two numbers', () => {
      const num1 = 5;
      const num2 = 3;
      const mockResponse = { result: 8 };

      service.add(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/add?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should subtract two numbers', () => {
      const num1 = 10;
      const num2 = 4;
      const mockResponse = { result: 6 };

      service.subtract(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/subtract?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should multiply two numbers', () => {
      const num1 = 6;
      const num2 = 7;
      const mockResponse = { result: 42 };

      service.multiply(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/multiply?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should divide two numbers', () => {
      const num1 = 20;
      const num2 = 5;
      const mockResponse = { result: 4 };

      service.divide(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/divide?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should perform integer division', () => {
      const num1 = 22;
      const num2 = 7;
      const mockResponse = { result: 3 };

      service.integerDivide(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/integer_divide?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle the division by zero', () => {
      const num1 = 30;
      const num2 = 0;
      const mockError = {
        error: { error: 'Cannot divide by zero.' },
        status: 400,
        statusText: 'Bad Request',
      };
    
      service.divide(num1, num2).subscribe({
        next: () => {
          fail('Expected an error, but the request succeeded');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.error.error).toBe('Cannot divide by zero.');
        },
      });
    
      const req = httpMock.expectOne(`${service['apiUrl']}/divide?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockError.error, { status: mockError.status, statusText: mockError.statusText });
    });


    it('should check if a number is prime', () => {
      const testNumber = 7;
      const mockResponse = { isPrime: true };

      service.isPrime(testNumber).subscribe((response) => {
        expect(response).toEqual(mockResponse); 
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/is_prime?number=${testNumber}`);
      expect(req.request.method).toBe('GET'); 
      req.flush(mockResponse);
    });

    it('should calculate the square root', () => {
      const testNumber = 16;
      const mockResponse = { squareRoot: 4 };
      service.squareRoot(testNumber).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(`${service['apiUrl']}/square_root?number=${testNumber}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
});
