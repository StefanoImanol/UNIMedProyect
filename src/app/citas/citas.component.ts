import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  citas = [
    { doctor: 'Alberto Carranza', paciente: 'Maria Carranza', fecha: '16/10/2024', hora: '11:00 am', estado: true },
    { doctor: 'Alberto Carranza', paciente: 'Juan Gonzales', fecha: '17/10/2024', hora: '10:00 am', estado: false },
    { doctor: 'Alberto Carranza', paciente: 'Roberto Torres', fecha: '18/10/2024', hora: '10:00 am', estado: false },
    { doctor: 'Alberto Carranza', paciente: 'Juan Gonzales', fecha: '19/10/2024', hora: '10:00 am', estado: true }
  ];

  constructor(private router: Router) {}

  toggleEstado(cita: any) {
    cita.estado = !cita.estado;
    console.log(`Estado de la cita para ${cita.paciente} actualizado a: ${cita.estado}`);
  }

  navigateToHome() {
    this.router.navigate(['/home-administrador']);
  }
}
