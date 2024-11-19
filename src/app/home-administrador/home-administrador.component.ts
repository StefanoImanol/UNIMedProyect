import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home-administrador']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  modify() {
    this.router.navigate(['/modificar-especialidades']);
  }

  appointments() {
    this.router.navigate(['/citas']);
  }
}
