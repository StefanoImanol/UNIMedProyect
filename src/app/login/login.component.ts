import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  login() {
    const payload = {
      correo: this.email,
      password: this.password,
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.post('http://127.0.0.1:8000/api/token/', payload, { headers }).subscribe({
      next: (response: any) => {
        const { access, refresh, rol } = response; // Incluye el rol en la respuesta
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
  
        // Redirige según el rol
        if (rol === 'Paciente') {
          this.router.navigate(['/home-paciente']);
        } else if (rol === 'Medico') {
          this.router.navigate(['/home-medico']);
        } else if (rol === 'Administrador') {
          this.router.navigate(['/home-administrador']);
        } else {
          alert('Rol no reconocido. Contacte con soporte.');
        }
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas o error de conexión.');
      },
    });
  }
  
  goToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro.
  }
}
