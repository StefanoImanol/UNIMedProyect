import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (!this.email || !this.password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const payload = {
        email: this.email,
        password: this.password
    };

    this.http.post('http://127.0.0.1:8000/login/', payload, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
        if (response.redirect === 'home-administrador') {
          this.router.navigate(['/home-administrador']);
        } else if (response.redirect === 'home-paciente') {
          this.router.navigate(['/home-paciente']);
        } else if (response.redirect === 'home-medico') {
          this.router.navigate(['/home-medico']);
        }
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas o error de conexión.');
      }
    });
  }
}
