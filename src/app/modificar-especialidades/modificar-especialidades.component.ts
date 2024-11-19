import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-especialidades',
  templateUrl: './modificar-especialidades.component.html',
  styleUrls: ['./modificar-especialidades.component.css']
})
export class ModificarEspecialidadesComponent {
  especialidades: string[] = ['Medicina General', 'Oftalmología', 'Psicología', 'Odontología', 'Nutrición', 'Dermatología'];
  modalOpen = false;
  newSpecialty = '';

  constructor(private router: Router) {}

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
      this.especialidades.push(this.newSpecialty.trim());
      this.newSpecialty = '';
      this.modalOpen = false;
      alert('Especialidad añadida correctamente.');
    } else {
      alert('Por favor, ingresa un nombre válido.');
    }
  }

  goToModifySchedule(especialidad: string) {
    alert(`Redirigiendo para modificar el horario de: ${especialidad}`);
    // Aquí rediriges a la vista de modificar horario.
    this.router.navigate(['/modificar-horario', especialidad]);
  }
  deleteSpecialty(index: number) {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar la especialidad "${this.especialidades[index]}"?`);
    if (confirmation) {
      this.especialidades.splice(index, 1);
      alert('Especialidad eliminada correctamente.');
    }
  }
  
  
}
