import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  apellidos: string = '';
  fechaNacimiento: string = '';
  codigo: string = '';
  correo: string = '';
  contrasena: string = ''; // Cambiado de "contraseña" a "contrasena"
  
  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    const formattedFechaNacimiento = new Date(this.fechaNacimiento).toISOString().split('T')[0];
    const payload = {
      nombre: this.nombre,
      apellidos: this.apellidos || null, // Los apellidos son opcionales
      fecha_nacimiento: formattedFechaNacimiento, // Formato correcto de la fecha
      codigo_uni: this.codigo, // Código universitario
      correo: this.correo, // Correo universitario
      contrasena: this.contrasena, // Contraseña (asegúrate que coincida con el backend)
    };

    this.http.post('http://127.0.0.1:8000/register/', payload, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/confirmacion']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro. Verifica los datos ingresados.');
      }
    });
  }

  onBack() {
    this.router.navigate(['/login']);
  }
}
