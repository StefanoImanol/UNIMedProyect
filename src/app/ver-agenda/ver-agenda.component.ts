import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-agenda',
  templateUrl: './ver-agenda.component.html',
  styleUrls: ['./ver-agenda.component.css']
})
export class VerAgendaComponent {
  agenda = [
    { foto: '../../assets/Imagenes/UserAjustado.png', nombre: 'Juan Gonzales', fechaConsulta: '15/10/2024', horaConsulta: '10:00 am' },
    { foto: '../../assets/Imagenes/UserAjustado.png', nombre: 'Maria Carranza', fechaConsulta: '16/10/2024', horaConsulta: '11:00 am' },
    { foto: '../../assets/Imagenes/UserAjustado.png', nombre: 'Joel Arquinigo', fechaConsulta: '20/12/2024', horaConsulta: '11:00 am' },
    { foto: '../../assets/Imagenes/UserAjustado.png', nombre: 'Cinthya Miranda', fechaConsulta: '01/06/2024', horaConsulta: '11:00 am' },
    { foto: '../../assets/Imagenes/UserAjustado.png', nombre: 'Jair Sánchez', fechaConsulta: '25/04/2024', horaConsulta: '3:00 pm' }
  ];

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home-medico']);
  }
  ngOnInit() {
    const hoy = new Date();
    this.agenda = this.agenda.filter((paciente) => {
      const fechaConsulta = new Date(paciente.fechaConsulta);
      return fechaConsulta >= hoy;
    });
  }
  
}
