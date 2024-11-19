import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.css']
})
export class HomePacienteComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home-paciente']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.router.navigate(['/perfil-paciente']);
  }

  scheduleAppointment() {
    this.router.navigate(['/agendar-cita']);
  }
}
