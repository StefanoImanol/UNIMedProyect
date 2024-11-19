import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router) {}

  onRegister() {
    this.router.navigate(['/confirmacion']); // Ajusta el enlace según tu ruta de confirmación
  }

  onBack() {
    this.router.navigate(['/login']); // Ajusta el enlace según tu ruta de inicio de sesión
  }
}
