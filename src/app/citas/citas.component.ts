import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent implements OnInit {
  citas: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.apiService.obtenerTodasCitas().subscribe({
      next: (data: any) => {
        // Ordenar citas por fecha de más recientes a más antiguas
        this.citas = data.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      },
      error: (err) => {
        console.error('Error al cargar las citas:', err);
        alert('No se pudieron cargar las citas. Intenta nuevamente.');
      },
    });
  }

  toggleEstado(cita: any) {
    cita.estado = !cita.estado;
  
    // Llamada al API para actualizar el estado
    this.apiService.cambiarEstadoCita(cita.id, { estado: cita.estado }).subscribe({
      next: () => {
        console.log(`Estado de la cita actualizado correctamente: ${cita.estado}`);
      },
      error: (err) => {
        console.error('Error al actualizar el estado de la cita:', err);
        alert('No se pudo actualizar el estado. Intente nuevamente.');
        // Revertir el cambio local si falla la actualización
        cita.estado = !cita.estado;
      }
    });
  }
  

  navigateToHome() {
    this.router.navigate(['/home-administrador']);
  }
}
