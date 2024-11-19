import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {

  constructor(private router: Router) {}

  onConfigureProfile() {
    this.router.navigate(['/perfil-paciente']); // Cambia 'perfil-paciente' según tu ruta
  }

  onGoHome() {
    this.router.navigate(['/home-paciente']); // Cambia 'home-paciente' según tu ruta
  }
}
