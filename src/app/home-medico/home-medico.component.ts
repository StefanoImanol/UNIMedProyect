import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home-medico']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.router.navigate(['/perfil-medico']);
  }

  scheduleAppointment() {
    this.router.navigate(['/ver-agenda']);
  }
}
