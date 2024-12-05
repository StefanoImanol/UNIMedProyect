import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.css']
})
export class HomePacienteComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {}

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // Devuelve true si existe un token de acceso
  }

  goToHome() {
    this.router.navigate(['/home-paciente']);
  }

  logout() {
    // Limpiar el localStorage y redirigir al login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.router.navigate(['/perfil-paciente']);
  }

  scheduleAppointment() {
    this.router.navigate(['/agendar-cita']);
  }

  ngOnInit() {
    if (!this.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      alert('Por favor, inicia sesión.');
      this.router.navigate(['/login']);
    } else {
      console.log('HomePacienteComponent inicializado.');
    }
  }
}
