import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modificar-especialidades',
  templateUrl: './modificar-especialidades.component.html',
  styleUrls: ['./modificar-especialidades.component.css'],
})
export class ModificarEspecialidadesComponent implements OnInit {
  especialidades: { especialidad_id: number; nombre_especialidad: string }[] = [];
  modalOpen = false;
  newSpecialty = '';

  constructor(private router: Router, private apiService: ApiService) {}

  

  ngOnInit() {
    this.apiService.obtenerEspecialidad().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log(this.especialidades); // Verifica que los datos sean correctos
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
        alert('No se pudieron cargar las especialidades. Intenta nuevamente.');
      },
    });
  }

  
  
  deleteSpecialty(especialidadId: number) {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar la especialidad con ID: "${especialidadId}"?`);
    if (confirmation) {
      this.apiService.eliminarEspecialidad(especialidadId).subscribe({
        next: () => {
          this.especialidades = this.especialidades.filter(e => e.especialidad_id !== especialidadId);
          alert('Especialidad eliminada correctamente.');
        },
        error: (err) => {
          console.error('Error al eliminar la especialidad:', err);
          alert('No se pudo eliminar la especialidad. Intenta nuevamente.');
        }
      });
    }
  }
  
  
  cargarEspecialidades() {
    this.apiService.obtenerEspecialidades().subscribe({
      next: (data: any[]) => {
        this.especialidades = data.map(item => item.nombre); // Extrae solo los nombres
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
        alert('No se pudieron cargar las especialidades. Intenta nuevamente.');
      }
    });
  }
  

  navigateToHome() {
    this.router.navigate(['/home-administrador']);
  }

  openAddModal() {
    this.modalOpen = true;
  }

  closeAddModal() {
    this.modalOpen = false;
  }

  addSpecialty() {
    if (this.newSpecialty.trim()) {
      this.apiService.crearEspecialidad(this.newSpecialty.trim()).subscribe({
        next: (response: any) => {
          alert('Especialidad añadida correctamente.');
          // Agregar la nueva especialidad a la lista
          this.especialidades.push({
            especialidad_id: response.id, // Asegúrate de que el backend devuelva el ID
            nombre_especialidad: this.newSpecialty.trim(),
          });
          this.newSpecialty = '';
          this.modalOpen = false;
        },
        error: (err) => {
          console.error('Error al añadir especialidad:', err);
          alert('No se pudo añadir la especialidad. Intenta nuevamente.');
        },
      });
    } else {
      alert('Por favor, ingresa un nombre válido.');
    }
  }
  

  goToModifySchedule(especialidad: { especialidad_id: number; nombre_especialidad: string }) {
    alert(`Redirigiendo para modificar el horario de: ${especialidad.nombre_especialidad}`);
    this.router.navigate(['/modificar-horario', especialidad.especialidad_id]);
  }
  


}
