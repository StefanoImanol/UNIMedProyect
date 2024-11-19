import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent {
  profileImage = '../../assets/Imagenes/UserAjustado.png';

  fields = [
    { id: 'nombre', label: 'Nombre', value: 'Stefano Imanol', readOnly: true, placeholder: '' },
    { id: 'apellidos', label: 'Apellidos', value: 'Ramírez Uribe', readOnly: true, placeholder: '' },
    { id: 'correo', label: 'Correo electrónico', value: 's***@uni.pe', readOnly: true, placeholder: '' },
    { id: 'codigo', label: 'Código UNI', value: '20214523I', readOnly: true, placeholder: '' },
    { id: 'direccion', label: 'Dirección', value: '', readOnly: true, placeholder: 'Agregar' },
    { id: 'telefono', label: 'Número de teléfono', value: '', readOnly: true, placeholder: 'Agregar' },
    { id: 'emergencia', label: 'Contacto en caso de emergencia', value: '', readOnly: true, placeholder: 'Agregar' }
  ];

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home-paciente']);
  }

  toggleEdit(field: any) {
    field.readOnly = !field.readOnly;
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
  proximaCita() {
    this.router.navigate(['/proxima-cita']);
  }
  cancelChanges() {
    this.fields.forEach(field => field.readOnly = true);
  }

  saveChanges() {
    console.log('Datos guardados:', this.fields);
    this.fields.forEach(field => field.readOnly = true);
  }
}
