import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from './service/calculator.service';

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
  squareRootSimbol : string = '√';
  operators = ['+', '-', '*', '/', '//', this.squareRootSimbol];
  currentValue = '';
  firstOperand: number | null = null;
  secondOperand: number | null = null;
  selectedOperator: string | null = null;
  textOnDisplay : boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  // Manejo del clic en un número
  onNumberClick(num: number): void {
    if(this.textOnDisplay) {
      this.resetCalculation();
    }
    this.currentValue += num.toString();
    this.operation += num.toString();
  }

  // Manejo del clic en un operador
  onOperatorClick(op: string): void {
    if(this.textOnDisplay) this.resetCalculation();
    else {
      if (!this.firstOperand && this.currentValue) {
        if(op === this.squareRootSimbol){
          this.firstOperand = parseFloat(this.currentValue);
          this.executeOperation();
        }
        else {
          this.firstOperand = parseFloat(this.currentValue);
          this.selectedOperator = op;
          this.operation += ` ${op} `;
          this.currentValue = '';
        }
      }
    }
  }

  // Manejo del clic en "="
  onEqualClick(): void {
    if (this.firstOperand !== null && this.selectedOperator) {
      this.secondOperand = parseFloat(this.currentValue);
      this.executeOperation();
    }
  }

  // Ejecutar la operación
  private executeOperation(): void {
    if (
      !this.selectedOperator ||
      this.firstOperand === null ||
      this.secondOperand === null
    ) {
      return;
    }

    switch (this.selectedOperator) {
      case '+':
        this.calculatorService
          .add(this.firstOperand, this.secondOperand)
          .subscribe((res) => {
            this.operation = res.sum.toString();
          });
        break;
      case '-':
        this.calculatorService
          .subtract(this.firstOperand, this.secondOperand)
          .subscribe((res) => {
            this.operation = res.difference.toString();
          });
        break;
      case '*':
        this.calculatorService
          .multiply(this.firstOperand, this.secondOperand)
          .subscribe((res) => {
            this.operation = res.product.toString();
          });
        break;
      case '/':
        this.calculatorService
          .divide(this.firstOperand,this.secondOperand).subscribe({
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
          .subscribe({
            next: (res) => this.operation = res.integer_quotient.toString(),
            error: (error) => this.operation = 'Error: ' + error.error.error,
        });
        break;
      case '√':
        this.calculatorService
          .squareRoot(this.firstOperand)
          .subscribe({
            next: (res) => this.operation = res.square_root.toString(),
              error: (error) => this.operation = 'Error: ' + error.error.error,
        });
        break;
    }

    this.resetCalculation();
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
    this.resetCalculation();
  }

  // Borrar el último carácter
  onDeleteClick(): void {
    debugger;
    if(this.textOnDisplay) {
      this.operation = '';
      this.resetCalculation();
    }
    else{
      if(this.selectedOperator && this.operation.trim().charAt(this.operation.trim().length-1) === this.selectedOperator) this.selectedOperator = null;
      this.currentValue = this.currentValue.slice(0, -1);
      this.operation = this.operation.slice(0, -1);
    }
  }

  // Resetear cálculo
  private resetCalculation(): void {
    this.currentValue = '';
    this.firstOperand = null;
    this.secondOperand = null;
    this.selectedOperator = null;
    this.operation = '';
    this.textOnDisplay = false;
  }
}
