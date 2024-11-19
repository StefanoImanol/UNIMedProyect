import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-horario',
  templateUrl: './modificar-horario.component.html',
  styleUrls: ['./modificar-horario.component.css']
})
export class ModificarHorarioComponent implements OnInit {
  selectedSpecialty = ''; // Especialidad seleccionada desde la URL
  doctors = [
    { name: 'Edward Soto', schedule: '8:00 - 12:00' },
    { name: 'Cristian Bazán', schedule: '2:00 - 6:00' }
  ];

  editModalOpen = false; // Estado del modal de edición
  addModalOpen = false; // Estado del modal de añadir
  selectedDoctor: any = null; // Médico seleccionado para edición
  newDoctor = { name: '', schedule: '', email: '', password: '' }; // Campos del nuevo médico

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Capturar la especialidad seleccionada desde la URL
    this.route.paramMap.subscribe(params => {
      this.selectedSpecialty = params.get('especialidad') || '';
    });
  }

  // Navegar al home del administrador
  navigateToHome() {
    this.router.navigate(['/home-administrador']);
  }

  // Abrir el modal de edición
  openEditModal(doctor: any) {
    if (doctor) {
      this.selectedDoctor = { ...doctor };
      this.editModalOpen = true; // Cambia el estado del modal
    }
  }

  // Cerrar el modal de edición
  closeEditModal() {
    this.editModalOpen = false;
    this.selectedDoctor = null;
  }

  // Guardar los cambios realizados al médico
  saveEdit() {
    const index = this.doctors.findIndex(doc => doc.name === this.selectedDoctor.name);
    if (index > -1) {
      this.doctors[index] = { ...this.selectedDoctor };
    }
    this.closeEditModal();
    alert('Cambios guardados correctamente.');
  }

  // Abrir el modal para añadir un nuevo médico
  openAddModal() {
    this.addModalOpen = true; // Cambia el estado del modal
  }

  // Cerrar el modal de añadir nuevo médico
  closeAddModal() {
    this.addModalOpen = false;
    this.newDoctor = { name: '', schedule: '', email: '', password: '' };
  }

  // Añadir un nuevo médico
  addDoctor() {
    if (this.newDoctor.name && this.newDoctor.schedule && this.newDoctor.email && this.newDoctor.password) {
      this.doctors.push({ name: this.newDoctor.name, schedule: this.newDoctor.schedule });
      this.closeAddModal();
      alert('Nuevo médico añadido correctamente.');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Eliminar un médico
  deleteDoctor(index: number) {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar a ${this.doctors[index].name}?`);
    if (confirmation) {
      this.doctors.splice(index, 1); // Eliminar al médico del array
      alert('Médico eliminado correctamente.');
    }
  }
}
