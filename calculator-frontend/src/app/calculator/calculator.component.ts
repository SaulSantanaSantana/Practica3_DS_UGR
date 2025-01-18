import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from './service/calculator.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  operation = '';
  numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  operators = [{operator: '+', single: false}, 
    {operator: '-', single: false}, 
    {operator: '*', single: false}, 
    {operator: '/', single: false}, 
    {operator: '//', single: false},
    {operator: '√', single: true}];
  currentValue = '';
  firstOperand: number | null = null;
  secondOperand: number | null = null;
  selectedOperator: any | null = null;
  textOnDisplay : boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  // Manejo del clic en un número
  onNumberClick(num: number): void {
    if(this.textOnDisplay) { this.clearAllValues();}
    this.currentValue += num.toString();
    this.operation += num.toString();
  }

  // Manejo del clic en un operador
  onOperatorClick(op: any): void {
    if(this.textOnDisplay) this.clearAllValues();
    else {
      if (!this.firstOperand || !this.selectedOperator) {
        this.firstOperand = parseFloat(this.currentValue);
        this.selectedOperator = op;
        this.operation += ` ${op.operator} `;
        this.currentValue = '';
        if(op.single) this.secondOperand = -1;
      }
    }
  }

  // Manejo del clic en "="
  onEqualClick(): void {    
    if (this.firstOperand !== null && this.selectedOperator) {
      if(!this.selectedOperator.single)  this.secondOperand = parseFloat(this.currentValue);
      this.executeOperation();
    }
  }

  // Ejecutar la operación
  private executeOperation(): void {
    if (!this.selectedOperator ||
      this.firstOperand === null ||
      this.secondOperand === null)
    {
      return;
    }
    
    switch (this.selectedOperator.operator) {
      case '+':
        this.calculatorService
          .add(this.firstOperand, this.secondOperand)
          .pipe(
            finalize(() => this.resetCalculation())
          ).subscribe((res) => {
            this.operation = res.sum.toString();
          });
        break;
      case '-':
        this.calculatorService
          .subtract(this.firstOperand, this.secondOperand)
          .pipe(
            finalize(() => this.resetCalculation())
          ).subscribe((res) => {
            this.operation = res.difference.toString();
          });
        break;
      case '*':
        this.calculatorService
          .multiply(this.firstOperand, this.secondOperand)
          .pipe(
            finalize(() => this.resetCalculation())
          ).subscribe((res) => {
            this.operation = res.product.toString();
          });
        break;
      case '/':
        this.calculatorService
          .divide(this.firstOperand,this.secondOperand)
          .pipe(
            finalize(() => this.resetCalculation())
          ).subscribe({
            next: (res) => this.operation = res.quotient.toString(),
            error: (error) => {
              this.operation = 'NaN';
              this.textOnDisplay = true;
            },
            complete: () => console.info('complete') 
        });
        break;
      case '//':
        this.calculatorService
          .integerDivide(this.firstOperand, this.secondOperand)
          .pipe(
            finalize(() => this.resetCalculation())
          ).subscribe({
            next: (res) => this.operation = res.integer_quotient.toString(),
            error: (error) => this.operation = 'Error: ' + error.error.error,
        });
        break;
      case '√':
        this.calculatorService
          .squareRoot(this.firstOperand)
          .pipe(
            finalize(() => this.resetCalculation())
          ).subscribe({
            next: (res) => this.operation = res.square_root.toString(),
              error: (error) => this.operation = 'Error: ' + error.error.error,
        });
        break;
    }
  }

  // Calcula si es primo
  isPrimeClick(){
    if (!this.selectedOperator && this.currentValue) {
      this.calculatorService
          .isPrime(parseFloat(this.currentValue)).subscribe({
            next: (res) => {
              this.operation =  JSON.parse(res.is_prime) ? "PRIME" : "NOT PRIME";
              this.textOnDisplay = true;
            },
            error: (error) => this.operation = 'Error: ' + error.error.error,
            complete: () => console.info('complete') 
        });
    }  
  }

  // Borrar todo
  onClearClick(): void {
    this.clearAllValues();
  }

  // Borrar el último carácter
  onDeleteClick(): void {
    debugger;
      if(this.selectedOperator && this.operation.trim().endsWith(this.selectedOperator.operator)){
        this.operation = this.operation.replace(this.selectedOperator.operator, '').trim();
        this.selectedOperator = null;
        this.currentValue = this.operation;
      } 
      else{
        this.currentValue = this.currentValue.slice(0, -1);
        this.operation = this.operation.slice(0, -1);
      }
    
  }

  private clearAllValues(): void {
    this.operation = '';
    this.resetCalculation();
  }

  // Resetear cálculo
  private resetCalculation(): void {
    debugger;
    this.currentValue = this.operation;
    this.firstOperand = null;
    this.secondOperand = null;
    this.selectedOperator = null;
    this.textOnDisplay = false;
  }
}
