import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proxima-cita',
  templateUrl: './proxima-cita.component.html',
  styleUrls: ['./proxima-cita.component.css']
})
export class ProximaCitaComponent {
  profileImage = '../../assets/Imagenes/UserAjustado.png';
  citaData = {
    dia: '15/10/2024',
    hora: '2:00 pm',
    especialidad: 'Medicina general',
    doctor: 'Mauricio Ramos Cordoba'
  };

  constructor(public router: Router) {}
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
  cancelarCita() {
    alert("La cita ha sido cancelada.");
    this.router.navigate(['/cancelar']);
    // Aquí puedes agregar la lógica para cancelar la cita en la base de datos
  }
  viewProfile() {
    this.router.navigate(['/perfil-paciente']);
  }
  reprogramarCita() {
    alert("Reprogramar cita activado.");
    this.router.navigate(['/reprogramar-cita']);
    // Aquí puedes agregar la lógica para reprogramar la cita
  }
}
