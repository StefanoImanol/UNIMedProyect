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
    console.log('Inicio de login'); // <-- Depuración
  
    const payload = {
      correo: this.email,
      password: this.password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http.post('http://127.0.0.1:8000/api/token/', payload, { headers }).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response); // <-- Depuración
        const { access, refresh } = response;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        console.log('Tokens guardados'); // <-- Depuración
  
        this.router.navigate(['/home-paciente']).then(() => {
          console.log('Redirección exitosa a /home-paciente'); // <-- Depuración
        }).catch((error) => {
          console.error('Error en la redirección:', error); // <-- Depuración
        });
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error); // <-- Depuración
        alert('Credenciales incorrectas o error de conexión.');
      }
    });
  }
  

  goToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro.
  }
}
