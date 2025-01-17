import { bootstrapApplication } from '@angular/platform-browser';
import { CalculatorComponent } from './app/calculator/calculator.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(CalculatorComponent, {
    providers: [
      provideHttpClient()]}).catch((err) => console.error(err));
