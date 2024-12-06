import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-proxima-cita',
  templateUrl: './proxima-cita.component.html',
  styleUrls: ['./proxima-cita.component.css']
})
export class ProximaCitaComponent implements OnInit {
  profileImage = '../../assets/Imagenes/UserAjustado.png'; // Imagen predeterminada
  citaData: any = null; // Inicializamos en null para manejar el estado de carga
  loading = true; // Estado para mostrar un mensaje de "cargando"

  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadProximaCita();
  }

  loadProximaCita() {
    this.apiService.getProximaCita().subscribe({
      next: (data: any) => {
        this.citaData = {
          id: data.id || '',
          dia: data.dia || '',
          hora: data.hora || '',
          especialidad: data.especialidad || '',
          doctor: data.doctor || ''
        };
        this.loading = false; // Ocultamos el estado de carga una vez que los datos llegan
      },
      error: (err) => {
        console.error('Error al cargar los datos de la próxima cita:', err);
        if (err.status === 401) {
          alert('No estás autenticado. Por favor, inicia sesión nuevamente.');
          this.router.navigate(['/login']);
        } else {
          alert('No se pudieron cargar los datos de la próxima cita.');
        }
        this.loading = false; // Incluso si hay un error, ocultamos el estado de carga
      }
    });
  }

  cancelarCita() {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      const citaId = this.citaData.id;
      if (!citaId) {
        alert('Error: No se encontró el ID de la cita.');
        return;
      } // Asegúrate de que `id` está definido en `citaData`
      this.apiService.cancelarCita(citaId).subscribe({
        next: () => {
          alert('Cita cancelada exitosamente.');
          this.router.navigate(['/cancelar']); // Redirige al componente de cancelación // Redirige al usuario al inicio o a otra vista
        },
        error: (err) => {
          console.error('Error al cancelar la cita:', err);
          alert('No se pudo cancelar la cita. Intenta nuevamente.');
        }
      });
    }
  }
  
  reprogramarCita() {
    alert('Redirigiendo a la pantalla de reprogramar cita.');
    this.router.navigate(['/reprogramar-cita']);
  }

  navigateToHome() {
    this.router.navigate(['/home-paciente']);
  }

  viewProfile() {
    this.router.navigate(['/perfil-paciente']);
  }
}
