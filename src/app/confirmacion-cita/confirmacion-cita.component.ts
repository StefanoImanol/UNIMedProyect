import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion-cita',
  templateUrl: './confirmacion-cita.component.html',
  styleUrls: ['./confirmacion-cita.component.css']
})
export class ConfirmacionCitaComponent {

  constructor(private router: Router) {}


  onGoHome() {
    this.router.navigate(['/home-paciente']); // Cambia 'home-paciente' según tu ruta
  }
}
