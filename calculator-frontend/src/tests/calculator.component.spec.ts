import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { provideHttpClient } from '@angular/common/http';
import { CalculatorComponent } from '../app/calculator/calculator.component';
import { CalculatorService } from '../app/calculator/service/calculator.service';
import { of } from 'rxjs';

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
    calculatorService = jasmine.createSpyObj('CalculatorService', ['getResult']);

    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useValue: calculatorService }//, // Mock del servicio
        //SprovideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
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
      expect(compiled.querySelectorAll('button').length).toBe(17);
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
    
      expect(numberButtons.length).toBe(10);
      expect(operatorButtons.length).toBe(4);
      expect(clearButton).toBeTruthy();
      expect(deleteButton).toBeTruthy();
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
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('5+');
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

    it('shouldnt be allowed to enter an operator if equals is on display', () => {
      component.operation = "30+5=35";
      additionButton.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('30+5=35');
  
    });
  });


  describe('Basic operations', () => {
    //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
    it('should call CalculatorService when "=" is clicked', () => {
      const response = '8';
      const operation = '5+3';
      component.operation = operation;
      //calculatorService.getResult.and.returnValue(of(response));
      calculatorService.getResult.and.returnValue(response);
      equalsButton.click();
      fixture.detectChanges();
      expect(calculatorService.getResult).toHaveBeenCalledWith(operation);
      expect(component.operation).toBe(`${operation}=${response}`);
      expect(display.textContent).toBe(`${operation}=${response}`);
    });

    //TODO volver a poner cuando se haga llamada al servicio para no tener que mockear
    it('should handle division by 0', () => {
      component.operation = '30/0';
      //calculatorService.getResult.and.returnValue(of(response));
      calculatorService.getResult.and.returnValue(NaN);
      equalsButton.click();
      fixture.detectChanges();
      expect(calculatorService.getResult).toHaveBeenCalledWith('30/0');
      expect(component.operation).toBe(NaN);
      expect(display.textContent).toBe(NaN);
    });
  });


  describe('Allowed reset buttons interactions', () => {
    it('should be allowed to write a number if NaN is on display', () => {
      component.operation = NaN;
      const number = htmlDOM.querySelector('button[data-num="5"]');
      number.click();
      fixture.detectChanges();
      expect(display.textContent).toBe('5');
    });

    it('should be allowed to write a number if equals is on display', () => {
      component.operation = "30+5=35";
      htmlDOM.querySelector('button[data-num="5"]').click();
      fixture.detectChanges();
      expect(display.textContent).toBe('5');
    });
  });
});
