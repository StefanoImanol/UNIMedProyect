import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-medico',
  templateUrl: './perfil-medico.component.html',
  styleUrls: ['./perfil-medico.component.css']
})
export class PerfilMedicoComponent {
  profileImage = '../../assets/Imagenes/UserAjustado.png';

  fields = [
    { id: 'nombre', label: 'Nombre', value: 'Nombre del médico', readOnly: true, placeholder: '' },
    { id: 'apellidos', label: 'Apellidos', value: 'Apellidos del médico', readOnly: true, placeholder: '' },
    { id: 'correo', label: 'Correo electrónico', value: 's***@uni.pe', readOnly: true, placeholder: '' },
    { id: 'direccion', label: 'Dirección', value: '', readOnly: true, placeholder: 'Agregar' },
    { id: 'telefono', label: 'Número de teléfono', value: '', readOnly: true, placeholder: 'Agregar' }
  ];

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home-medico']);
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

  cancelChanges() {
    this.fields.forEach((field) => (field.readOnly = true));
  }

  saveChanges() {
    console.log('Datos guardados:', this.fields);
    this.fields.forEach((field) => (field.readOnly = true));
  }
}
