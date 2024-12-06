import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-perfil-medico',
  templateUrl: './perfil-medico.component.html',
  styleUrls: ['./perfil-medico.component.css'],
})
export class PerfilMedicoComponent implements OnInit {
  profileImage = '../../assets/Imagenes/UserAjustado.png';
  fields = [
    { id: 'nombre', label: 'Nombre', value: '', readOnly: true, placeholder: '' },
    { id: 'apellidos', label: 'Apellidos', value: '', readOnly: true, placeholder: '' },
    { id: 'correo', label: 'Correo electrónico', value: '', readOnly: true, placeholder: '' },
  ];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.cargarDatosMedico();
  }

  navigateToHome() {
    this.router.navigate(['/home-medico']);
  }

  toggleEdit(field: any) {
    field.readOnly = !field.readOnly;
  }

  saveChanges() {
    const updatedData: any = {};
    this.fields.forEach((field) => {
      updatedData[field.id] = field.value;
      field.readOnly = true;
    });

    this.apiService.updateMedicoProfile(updatedData).subscribe({
      next: () => {
        alert('Datos guardados exitosamente.');
      },
      error: (err) => {
        console.error('Error al guardar los datos:', err);
        alert('No se pudieron guardar los datos. Intenta nuevamente.');
      },
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

      const formData = new FormData();
      formData.append('profile_image', file);

      this.apiService.updateMedicoProfileImage(formData).subscribe({
        next: () => {
          alert('Imagen de perfil actualizada.');
        },
        error: (err) => {
          console.error('Error al actualizar la imagen:', err);
        },
      });
    }
  }
  cargarDatosMedico() {
    this.apiService.getMedicoProfileData().subscribe({
      next: (data: any) => {
        this.fields.forEach((field) => {
          field.value = data[field.id] || '';
        });
      },
      error: (err) => {
        console.error('Error al cargar datos del médico:', err);
        alert('No se pudieron cargar los datos. Intenta nuevamente.');
      },
    });
  }
  cancelChanges() {
    this.cargarDatosMedico();
  }

}
