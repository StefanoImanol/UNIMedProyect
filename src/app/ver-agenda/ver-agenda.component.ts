import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ver-agenda',
  templateUrl: './ver-agenda.component.html',
  styleUrls: ['./ver-agenda.component.css']
})
export class VerAgendaComponent implements OnInit {
  agenda: any[] = []; // Asegúrate de inicializarlo como un array vacío
  defaultImage: string = '../../assets/Imagenes/UserAjustado.png'; // Imagen predeterminada

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.cargarAgenda();
  }

  cargarAgenda() {
    this.apiService.obtenerAgendaMedico().subscribe({
      next: (data: any) => {
        console.log('Datos de la agenda recibidos:', data);
        // Valida que los datos estén completos antes de asignarlos
        this.agenda = data.map((item: any) => ({
          nombre: item.nombre || 'Desconocido',
          fechaConsulta: item.fechaConsulta || 'Sin fecha',
          horaConsulta: item.horaConsulta || 'Sin hora',
          foto: this.defaultImage // Usa la imagen predeterminada
        }));
      },
      error: (error) => {
        console.error('Error al cargar la agenda:', error);
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/home-medico']);
  }
}
