import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalculatorService } from '../app/calculator/service/calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalculatorService],
    });

    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Basic operations', () => {
    it('should do the addition operation', () => {
      const num1 = 5;
      const num2 = 3;
      const mockResponse = { sum: 8 };

      service.add(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/add?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should do the subtraction operation', () => {
      const num1 = 10;
      const num2 = 4;
      const mockResponse = { difference: 6 };

      service.subtract(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/subtract?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should do the multiply operation', () => {
      const num1 = 6;
      const num2 = 7;
      const mockResponse = { product: 42 };

      service.multiply(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/multiply?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should do the division operation', () => {
      const num1 = 20;
      const num2 = 5;
      const mockResponse = { quotient: 4 };

      service.divide(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/divide?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should do the integer division operation', () => {
      const num1 = 22;
      const num2 = 7;
      const mockResponse = { integer_quotient: 3 };
  
      service.integerDivide(num1, num2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${service['apiUrl']}/integer_divide?num1=${num1}&num2=${num2}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
    
  });

  describe('Complex operations', () => {
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
  
    it('should do the square root operation', () => {
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

  describe('Operations corner cases', () => {
    it('should handle the division by zero', () => {
    const num1 = 30;
    const num2 = 0;
    const mockError = {
      error: { error: 'Cannot divide by zero.' },
      status: 400,
      statusText: 'Bad Request',
    };

    service.divide(num1, num2).subscribe({
      next: () => fail('Expected an error, but the request succeeded'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.error.error).toBe('Cannot divide by zero.');
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/divide?num1=${num1}&num2=${num2}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockError.error, { status: mockError.status, statusText: mockError.statusText });
    });
  });

});