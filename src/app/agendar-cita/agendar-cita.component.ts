import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

interface Horario {
  hora: string;
  disponible: boolean;
  seleccionado: boolean;
}

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})

export class AgendarCitaComponent implements AfterViewInit {
  nombrePaciente = 'Nombre del Paciente';
  apellidoPaciente = 'Apellido del Paciente';
  especialidades: string[] = ['Cardiología', 'Dermatología', 'Pediatría']; // Datos simulados
  medicos: string[] = ['Dr. Pérez', 'Dr. Gómez', 'Dr. López']; // Datos simulados
  horarios: Horario[] = [
    { hora: '10:00 am', disponible: true, seleccionado: false },
    { hora: '11:00 am', disponible: true, seleccionado: false },
    { hora: '12:00 pm', disponible: false, seleccionado: false },
    { hora: '1:00 pm', disponible: true, seleccionado: false },
    { hora: '2:00 pm', disponible: true, seleccionado: false }
  ]; // Datos simulados
  especialidadSeleccionada!: string;
  medicoSeleccionado!: string;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.inicializarCalendario();
  }

  inicializarCalendario() {
    new Pikaday({
      bound: false, // Esto hace que el calendario esté fijo y no sea desplegable.
      field: document.getElementById('calendar-container'),
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        console.log('Fecha seleccionada:', formattedDate);
        this.cargarHorarios(formattedDate); // Llama a la función para cargar horarios según la fecha seleccionada.
      }
    });
  }


  cargarHorarios(fecha: string) {
    console.log('Horarios cargados para la fecha:', fecha); // Simula la carga de horarios
  }

  seleccionarHorario(horario: Horario) {
    this.horarios.forEach(h => h.seleccionado = false);
    horario.seleccionado = true;
  }
  goToHome() {
    this.router.navigate(['/home-paciente']);
  }
  cancelar() {
    this.router.navigate(['/home-paciente']);
  }

  guardarCita() {
    const horarioSeleccionado = this.horarios.find(h => h.seleccionado);
    if (!horarioSeleccionado) {
      alert('Por favor selecciona un horario.');
      return;
    }
    const citaData = {
      paciente: {
        nombre: this.nombrePaciente,
        apellido: this.apellidoPaciente
      },
      especialidad: this.especialidadSeleccionada,
      medico: this.medicoSeleccionado,
      horario: horarioSeleccionado.hora
    };
    console.log('Cita guardada:', citaData);
    this.router.navigate(['/confirmacion-cita']);
  }
}
