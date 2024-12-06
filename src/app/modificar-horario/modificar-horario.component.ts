import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modificar-horario',
  templateUrl: './modificar-horario.component.html',
  styleUrls: ['./modificar-horario.component.css']
})
export class ModificarHorarioComponent implements OnInit {
  doctors: any[] = [];
  editModalOpen = false;
  addModalOpen = false;
  selectedDoctor: any = null;
  newDoctor = { name: '', email: '', password: '' };
  selectedSpecialty: number = 0;
  especialidad: string = ''; // Variable para almacenar el nombre de la especialidad
  days = [
    { name: 'Lunes', checked: false, startTime: '', endTime: '' },
    { name: 'Martes', checked: false, startTime: '', endTime: '' },
    { name: 'Miércoles', checked: false, startTime: '', endTime: '' },
    { name: 'Jueves', checked: false, startTime: '', endTime: '' },
    { name: 'Viernes', checked: false, startTime: '', endTime: '' },
    { name: 'Sábado', checked: false, startTime: '', endTime: '' },
    { name: 'Domingo', checked: false, startTime: '', endTime: '' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const especialidadId = Number(params.get('especialidad')); // Convertir el parámetro a número
      this.selectedSpecialty = especialidadId;
      this.obtenerEspecialida(especialidadId); // Llamar a la función para cargar el nombre de la especialidad
      this.cargarDoctores(especialidadId);
    });
  }
obtenerEspecialida(especialidadId: number) {
    this.apiService.obtenerEspecialida(especialidadId).subscribe({
        next: (data: any) => {
            this.especialidad = data.nombre_especialidad; // Asignar el nombre de la especialidad
        },
        error: err => console.error('Error al obtener la especialidad:', err)
    });
}
  cargarDoctores(especialidadId: number) {
    this.apiService.obtenerMedicosEspecialidades(especialidadId).subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data); // Agrega este log
        if (Array.isArray(data)) {
          this.doctors = data.map((medico: any) => ({
            id: medico.usuario_id,
            name: `${medico.usuario__nombre} ${medico.usuario__apellidos || ''}`.trim(),
            schedule: medico.horarios ? medico.horarios.map((horario: any) => ({
                dia: horario.dia,
                hora_inicio: horario.hora_inicio,
                hora_fin: horario.hora_fin
            })) : []
        }));
        } else {
          console.error('Los datos recibidos no son un array:', data);
          this.doctors = [];
        }
      },
      error: err => {
        console.error('Error al cargar los doctores:', err);
        this.doctors = [];
      }
    });
  }

  openEditModal(doctor: any) {
    this.selectedDoctor = { ...doctor };
    this.days.forEach(day => {
        const schedule = Array.isArray(this.selectedDoctor.schedule)
            ? this.selectedDoctor.schedule.find((s: any) => s.dia === day.name)
            : null;
        if (schedule) {
            day.checked = true;
            day.startTime = schedule.hora_inicio;
            day.endTime = schedule.hora_fin;
        } else {
            day.checked = false;
            day.startTime = '';
            day.endTime = '';
        }
    });
    this.editModalOpen = true;
}


  closeEditModal() {
    this.editModalOpen = false;
    this.selectedDoctor = null;
  }

  openAddModal() {
    this.newDoctor = { name: '', email: '', password: '' };
    this.days.forEach(day => {
      day.checked = false;
      day.startTime = '';
      day.endTime = '';
    });
    this.addModalOpen = true;
  }

  closeAddModal() {
    this.addModalOpen = false;
  }

  saveEdit() {
    const horarios = this.days
      .filter(day => day.checked)
      .map(day => ({
        dia: day.name,
        hora_inicio: day.startTime,
        hora_fin: day.endTime
      }));

    this.apiService.editarMedico(this.selectedDoctor.id, {
      nombre: this.selectedDoctor.name,
      horarios
    }).subscribe({
      next: () => {
        this.cargarDoctores(this.selectedSpecialty);
        this.closeEditModal();
      },
      error: err => console.error('Error al actualizar el médico:', err)
    });
  }

  addDoctor() {
    const horarios = this.days
        .filter(day => day.checked)
        .map(day => ({
            dia: day.name,
            hora_inicio: day.startTime,
            hora_fin: day.endTime
        }));

    this.apiService.crearMedico({
        nombre: this.newDoctor.name,
        correo: this.newDoctor.email,
        contrasena: this.newDoctor.password, // Nota que se usa "contrasena" en lugar de "password"
        especialidad_id: this.selectedSpecialty,
        horarios
    }).subscribe({
        next: () => {
            this.cargarDoctores(this.selectedSpecialty);
            this.closeAddModal();
        },
        error: err => console.error('Error al crear médico:', err)
    });
}



deleteDoctor(doctorId: number) {
  if (!doctorId) {
      console.error('El ID del médico es undefined o null');
      return;
  }
  this.apiService.eliminarMedico(doctorId).subscribe({
      next: () => this.cargarDoctores(this.selectedSpecialty),
      error: (err) => console.error('Error al eliminar médico:', err)
  });
}




  navigateToHome() {
    this.router.navigate(['/home-administrador']);
  }
}
