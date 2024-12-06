import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import moment from 'moment';
import Pikaday from 'pikaday';

interface Horario {
  hora: string;
  disponible: boolean;
  seleccionado: boolean;
}

@Component({
  selector: 'app-reprogramar-cita',
  templateUrl: './reprogramar-cita.component.html',
  styleUrls: ['./reprogramar-cita.component.css']
})
export class ReprogramarCitaComponent implements AfterViewInit {
  nombrePaciente = 'Nombre del Paciente';
  apellidoPaciente = 'Apellido del Paciente';
  especialidad!: string;
  medico!: number; // Cambiar a tipo `number` para el ID del médico
  horarios: Horario[] = [];
  fechaSeleccionada!: string;
  citaId!: number; // ID de la cita que será reprogramada
  profileImage = '../../assets/Imagenes/UserAjustado.png';

  constructor(private router: Router, private apiService: ApiService) {}

  ngAfterViewInit() {
    this.inicializarCalendario();
    this.cargarDatosCita();
  }

  inicializarCalendario() {
    new Pikaday({
      bound: false,
      field: document.getElementById('calendar-container'),
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        this.fechaSeleccionada = moment(date).format('YYYY-MM-DD');
        this.cargarHorarios();
      }
    });
  }

  cargarDatosCita() {
    this.apiService.getProximaCita().subscribe({
      next: (data: any) => {
        this.especialidad = data.especialidad;
        this.medico = data.medico_id; // ID del médico obtenido del backend
        this.citaId = data.id; // ID de la cita
      },
      error: (err) => console.error('Error al cargar los datos de la cita:', err)
    });
  }
  

  cargarHorarios() {
    if (!this.fechaSeleccionada || !this.medico) {
      console.error('Fecha seleccionada o ID del médico no disponibles.');
      return;
    }

    this.apiService.obtenerHorariosDisponibles(this.medico, this.fechaSeleccionada).subscribe({
      next: (data: any) => {
        this.horarios = data.map((h: any) => ({
          hora: h.hora,
          disponible: h.disponible,
          seleccionado: false
        }));
      },
      error: (err) => console.error('Error al cargar horarios:', err)
    });
  }

  seleccionarHorario(horario: Horario) {
    this.horarios.forEach(h => h.seleccionado = false);
    horario.seleccionado = true;
  }

  confirmarReprogramacion() {
    const horarioSeleccionado = this.horarios.find(h => h.seleccionado);
    if (!this.fechaSeleccionada || !horarioSeleccionado) {
      alert('Por favor selecciona una fecha y un horario.');
      return;
    }

    const nuevaCitaData = {
      fecha: this.fechaSeleccionada,
      hora: horarioSeleccionado.hora
    };

    this.apiService.reprogramarCita(this.citaId, nuevaCitaData).subscribe({
      next: () => {
        alert('Cita reprogramada exitosamente.');
        this.router.navigate(['/confirmacion-cita']);
      },
      error: (err) => {
        console.error('Error al reprogramar la cita:', err);
        alert('No se pudo reprogramar la cita. Intenta nuevamente.');
      }
    });
  }

  regresar() {
    this.router.navigate(['/proxima-cita']);
  }
}
