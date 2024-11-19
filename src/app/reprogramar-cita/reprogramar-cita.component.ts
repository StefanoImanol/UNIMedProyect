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
  selector: 'app-reprogramar-cita',
  templateUrl: './reprogramar-cita.component.html',
  styleUrls: ['./reprogramar-cita.component.css']
})
export class ReprogramarCitaComponent implements AfterViewInit {
  nombrePaciente = 'Nombre del Paciente';
  apellidoPaciente = 'Apellido del Paciente';
  especialidad!: string;
  medico!: string;
  horarios: Horario[] = [
    { hora: '10:00 am', disponible: true, seleccionado: false },
    { hora: '11:00 am', disponible: true, seleccionado: false },
    { hora: '12:00 pm', disponible: false, seleccionado: false },
    { hora: '1:00 pm', disponible: true, seleccionado: false },
    { hora: '2:00 pm', disponible: true, seleccionado: false }
  ];  
  profileImage = '../../assets/Imagenes/UserAjustado.png';
  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.inicializarCalendario();
  }

  inicializarCalendario() {
    new Pikaday({
      bound: false,
      field: document.getElementById('calendar-container'),
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        console.log('Fecha seleccionada:', formattedDate);
        this.cargarHorarios(formattedDate);
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  cargarHorarios(fecha: string) {
    console.log('Horarios cargados para la fecha:', fecha); // Simula la carga de horarios
    // Aquí puedes actualizar la lista de horarios en base a la fecha seleccionada
  }

  seleccionarHorario(horario: Horario) {
    this.horarios.forEach(h => h.seleccionado = false); // Deseleccionar todos
    horario.seleccionado = true; // Seleccionar el horario actual
  }
  

  confirmarReprogramacion() {
    const horarioSeleccionado = this.horarios.find(h => h.seleccionado);
    if (!horarioSeleccionado) {
      alert('Por favor selecciona un horario.');
      return;
    }
    const citaReprogramada = {
      paciente: {
        nombre: this.nombrePaciente,
        apellido: this.apellidoPaciente
      },
      especialidad: this.especialidad,
      medico: this.medico,
      nuevoHorario: horarioSeleccionado.hora
    };
    console.log('Cita reprogramada:', citaReprogramada);
    this.router.navigate(['/confirmacion-cita']);
  }

  regresar() {
    this.router.navigate(['/proxima-cita']);
  }
}
