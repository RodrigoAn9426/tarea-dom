import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './app.html', /* Actualizado al nombre de tu archivo */
  styleUrl: './app.css'      /* Actualizado al nombre de tu archivo */
})
export class App {
  num1: number = 0;
  num2: number = 0;
  operacion: string = '+';
  resultado: number = 0;
  historial: string[] = [];

  calcular() {
    switch(this.operacion) {
      case '+': 
        this.resultado = this.num1 + this.num2; 
        break;
      case '-': 
        this.resultado = this.num1 - this.num2; 
        break;
      case '*': 
        this.resultado = this.num1 * this.num2; 
        break;
      case '/': 
        this.resultado = this.num1 / this.num2; 
        break;
    }
    
    const textoOperacion = `${this.num1} ${this.operacion} ${this.num2} = ${this.resultado}`;
    this.historial.push(textoOperacion);
  }
}