import { Component } from '@angular/core';
import { CalculatorService } from './service/calculator.service';
import { CommonModule } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-calculator',
  imports: [CommonModule/*, HttpClientModule*/],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})



export class CalculatorComponent {
  operation: string = '';
  numbers: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  operators: string[] = ['/', 'x', '-', '+'];
  equal:string = '=';
  
  constructor(private calculatorService: CalculatorService) {}

  onNumberClick(number : string){
    if(this.operation === "NaN" || this.operation.includes(this.equal)) { 
      this.operation = '';
    }
    this.operation += number;
  }

  onOperatorClick(operator : string){
    if(this.operation.length > 0 && 
      !this.operators.includes(this.operation.charAt(this.operation.length-1))
    && this.operation !== "NaN" && !this.operation.includes(this.equal))
    this.operation += operator;
  }

  onDeleteClick(){
    if(this.operation.length > 0 && this.operation !== "NaN"){
      this.operation = this.operation.slice(0, this.operation.length - 1);     
    }
  }

  onClearClick(){
    this.operation = ''
  }

  onEqualClick(){
    if(this.operation.length > 0 
      && !this.operators.includes(this.operation.charAt(this.operation.length-1))
    && this.operators.some(operator => this.operation.includes(operator))){
        /*this.calculatorService.getResult(this.operation).subscribe({
          next: (response) => {
            if(response!== "NaN" && !this.operation.includes("Error") ){
              this.operation += this.equal + response;
            }
            else if (!this.operation.includes("Error")) {
              this.operation = response;
            }
            console.log('Resultado de la operación:', this.operation);
          },
          error: (error) => {
            this.operation = "Unexpected error";
            console.error('Error al calcular el resultado:', error);
          },
          complete: () => {
            console.log('Operación realizada');
          }
        });*/
        let result = this.calculatorService.getResult(this.operation);
        if(result!== "NaN" && !this.operation.includes("Error") ){
          this.operation += this.equal + result;
        }
        else if (!this.operation.includes("Error")) {
          this.operation = result;
        }
      }
  }

}
