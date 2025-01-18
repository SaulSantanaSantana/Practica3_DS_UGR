import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from '../app/calculator/calculator.component';
import { CalculatorService } from '../app/calculator/service/calculator.service';
import { of, throwError} from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorService: jasmine.SpyObj<CalculatorService>;
  let htmlDOM : any;
  let additionButton : any;
  let equalsButton : any;
  let deleteButton : any;
  let display : any;
  let NaN : string = "NaN";

  beforeEach(async () => { 
    const calculatorServiceSpy = jasmine.createSpyObj('CalculatorService', ['calculate', 'add', 'divide']);
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [{ provide: CalculatorService, useValue: calculatorServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    calculatorService = TestBed.inject(CalculatorService) as jasmine.SpyObj<CalculatorService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlDOM = fixture.nativeElement;
    additionButton = htmlDOM.querySelector('button[data-op="+"]');
    equalsButton = htmlDOM.querySelector('button[data-type="equals"]');
    deleteButton = htmlDOM.querySelector('button[data-type="delete"]');
    display = htmlDOM.querySelector('.display');
  });


  describe('Initialization', () => {
    it('should create the calculatorComponent', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Html elements initialization', () => {
    it('should render the title', () => {
      const compiled = htmlDOM as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('CALCULATOR');
    });

    it('should render the calculator buttons', () => {
      const compiled = htmlDOM as HTMLElement;
      expect(compiled.querySelectorAll('button').length).toBe(20);
    });

    it('should render display zone', () => {
      const compiled = htmlDOM as HTMLElement;
      const display = compiled.querySelector('.display');
      expect(display).toBeTruthy();
    });

    it('should render specific buttons', () => {
      const numberButtons = htmlDOM.querySelectorAll('button[data-type="number"]');
      const operatorButtons = htmlDOM.querySelectorAll('button[data-type="operator"]');
      const clearButton = htmlDOM.querySelector('button[data-type="clear"]');
      const isPrimeButton = htmlDOM.querySelector('button[data-type="prime"]');
    
      expect(numberButtons.length).toBe(10);
      expect(operatorButtons.length).toBe(6);
      expect(clearButton).toBeTruthy();
      expect(deleteButton).toBeTruthy();
      expect(isPrimeButton).toBeTruthy();
      expect(equalsButton).toBeTruthy();
    });

    it('numbers should be ordered', () => {
      const compiled = htmlDOM as HTMLElement;
      const numberButtons = compiled.querySelectorAll('button[data-type="number"]');
      const buttonValues = Array.from(numberButtons).map((btn) => btn.textContent?.trim());
      const expectedOrder = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
      expect(buttonValues).toEqual(expectedOrder);
    });
  });

  describe('Basic number and operators buttons interactions', () => {
    it('should display the number when a number button is clicked', () => {
      const number = htmlDOM.querySelector('button[data-num="5"]');
      number.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('5');
    });
    
    it('should display the operator when a operation button is clicked and there is a number before', () => {
      component.operation = '5';
      component.currentValue = '5'
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('5 + ');
    });

    it('shouldnt allow to introduce an operator when there is no number in the display', () => {
      component.operation = '';
      additionButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('');
    });

    it('shouldnt allow to introduce two consecutive operators', () => {
      component.operation = '5+';
      additionButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('5+');
    });
  });

  describe('Delete and clear buttons interactions', () => {
    it('should delete the last character when DELETE is clicked', () => {
      component.operation = '5+3';
      deleteButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('5+');
    });

    it('nothing should happen when DELETE is clicked and there is no numbers (and operations)', () => {
      component.operation = '';
      deleteButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('');
    });

    it('should clear the operation when CLEAR is clicked', () => {
      component.operation = '5+3';
      const clearButton = htmlDOM.querySelector('button[data-type="clear"]');
      clearButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('');
    });
  });

  describe('Forbidden buttons interactions', () => {
    it('should do nothing if equals is pressed and the last character of the display is an operator', () => {
      component.operation = '5+';
      equalsButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('5+');
    });

    it('should do nothing if equals is pressed and there is only numbers in the display', () => {
      component.operation = '53';
      equalsButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('53');
    });

    it('should do nothing if equals is pressed and there isnt anything in the display', () => {
      component.operation = '';
      equalsButton.click();
      fixture.detectChanges();
      expect(component.operation).toBe('');
    });
    it('shouldnt be allowed to enter an operator if NaN is on display', () => {
      component.operation = NaN;
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe(component.operation);
    });

    it('shouldnt be allowed to enter an operator if true is on display', () => {
      component.operation = "30+5=35";
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('30+5=35');
    });

    it('shouldnt be allowed to enter an operator if equals is on display', () => {
      component.operation = "30+5=35";
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('30+5=35');
  
    });

    it('shouldnt be allowed to enter an operator if PRIME is on display', () => {
      component.operation = "PRIME";
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('PRIME');
    });

    it('shouldnt be allowed to enter an operator if NOT PRIME is on display', () => {
      component.operation = "NOT PRIME";
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('NOT PRIME');
    });
  });


  describe('Allowed reset buttons interactions', () => {
    it('should be allowed to write a number if NaN, PRIME or NOT PRIME are on display', () => {
      component.textOnDisplay = true;
      const number = htmlDOM.querySelector('button[data-num="5"]');
      number.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('5');
    });
  });


    it('should call CalculatorService when "=" is clicked', (done) => {
      const operator = '+';
      const num1 = 5;
      const num2 = 3;
      const response = { sum: 8 };

      component.firstOperand = num1;
      component.textOnDisplay = false;
      component.currentValue = "3";
      component.selectedOperator = "+";
      component.operation = "5";

      calculatorService.add.and.returnValue(of(response));
      component.operation = `${num1} ${operator} ${num2}`;
      equalsButton.click();
      fixture.detectChanges();
      console.log('Spy calls:', calculatorService.add.calls.allArgs());
      expect(calculatorService.add).toHaveBeenCalledWith(num1, num2);
      expect(display.textContent).toBe(response.sum.toString());
      done();
    });


    it('should handle division by 0',  (done)  => {
      const num1 = 30;
      const num2 = 0;
      component.firstOperand = num1;
      component.currentValue = "0";
      component.selectedOperator = '/';
      component.operation = "30 / 0";
      component.textOnDisplay = false;
      const response = NaN;
    
      
      calculatorService.divide.and.returnValue(throwError(() => new Error("Cannot divide by zero.")));
      equalsButton.click();
      fixture.detectChanges();
  
      expect(calculatorService.divide).toHaveBeenCalledWith(num1, num2);
      
      expect(component.operation).toBe(response);
      expect(display.textContent).toBe(response);
      done();
    });
});
