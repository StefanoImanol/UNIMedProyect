import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import Pikaday from 'pikaday';
import { ApiService } from '../services/api.service'; // Cambiar a ApiService

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
  pacienteId!: number; // Ahora incluye la propiedad pacienteId
  especialidades: any[] = [];
  medicos: any[] = [];
  horarios: Horario[] = [];
  especialidadSeleccionada!: number;
  medicoSeleccionado!: number;
  fechaSeleccionada!: string;

  constructor(private router: Router, private apiService: ApiService) {}

  ngAfterViewInit() {
    this.inicializarCalendario();
    this.cargarDatosPaciente(); // Carga los datos del paciente y su ID
    this.cargarEspecialidades();
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

  cargarDatosPaciente() {
    this.apiService.obtenerDatosPaciente().subscribe((data: any) => {
      this.nombrePaciente = data.nombre;
      this.apellidoPaciente = data.apellidos;
      this.pacienteId = data.id; // Asigna dinámicamente el ID del paciente
    }, error => {
      console.error("Error al obtener datos del paciente:", error);
    });
  }

  cargarEspecialidades() {
    this.apiService.obtenerEspecialidades().subscribe((data: any) => {
      this.especialidades = data;
    });
  }

  cargarMedicos() {
    if (!this.especialidadSeleccionada) return;
    this.apiService.obtenerMedicosPorEspecialidad(this.especialidadSeleccionada).subscribe({
      next: (data: any) => {
        this.medicos = data;
      },
      error: (error) => {
        console.error('Error al cargar médicos:', error);
        this.medicos = [];
      }
    });
  }

  cargarHorarios() {
    if (!this.medicoSeleccionado || !this.fechaSeleccionada) {
      console.error('ID del médico o fecha no seleccionados');
      return;
    }
  
    this.horarios = []; // Limpia la lista de horarios antes de llenarla.
  
    this.apiService.obtenerHorariosDisponibles(this.medicoSeleccionado, this.fechaSeleccionada).subscribe({
      next: (data: any) => {
        this.horarios = data.map((h: any) => ({
          hora: h.hora,
          disponible: h.disponible,
          seleccionado: false,
        }));
      },
      error: (err) => {
        console.error('Error al cargar horarios', err);
      },
    });
  }
  

  seleccionarHorario(horario: Horario) {
    this.horarios.forEach(h => h.seleccionado = false);
    horario.seleccionado = true;
  }

  guardarCita() {
    const horarioSeleccionado = this.horarios.find(h => h.seleccionado);
    if (!horarioSeleccionado || !this.fechaSeleccionada || !this.medicoSeleccionado) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    const citaData = {
      medico_id: this.medicoSeleccionado,
      fecha: this.fechaSeleccionada,
      hora: horarioSeleccionado.hora,
    };
  
    this.apiService.crearCita(citaData).subscribe({
      next: (response) => {
        alert('Cita guardada exitosamente.');
        this.router.navigate(['/confirmacion-cita']);
      },
      error: (error) => {
        alert('Error al guardar la cita.');
        console.error(error);
      },
    });
  }
  
  goToHome() {
    this.router.navigate(['/home-paciente']);
  }

  cancelar() {
    this.router.navigate(['/home-paciente']);
  }
}
