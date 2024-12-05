import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {
  profileImage = '../../assets/Imagenes/UserAjustado.png';
  selectedFile: File | null = null;

  fields = [
    { id: 'nombre', label: 'Nombre', value: '', readOnly: true, placeholder: 'Nombre del paciente', pattern: '.*' },
    { id: 'apellidos', label: 'Apellidos', value: '', readOnly: true, placeholder: 'Apellidos del paciente', pattern: '.*' },
    { id: 'correo', label: 'Correo electrónico', value: '', readOnly: true, placeholder: 'Correo del paciente', pattern: '^[a-zA-Z0-9._%+-]+@uni\\.pe$' },
    { id: 'codigo', label: 'Código UNI', value: '', readOnly: true, placeholder: 'Código UNI del paciente', pattern: '.*' },
    { id: 'direccion', label: 'Dirección', value: '', readOnly: true, placeholder: 'Dirección del paciente', pattern: '.*' },
    { id: 'telefono', label: 'Número de teléfono', value: '', readOnly: true, placeholder: 'Teléfono del paciente', pattern: '.*' },
    { id: 'emergencia', label: 'Contacto en caso de emergencia', value: '', readOnly: true, placeholder: 'Contacto de emergencia', pattern: '.*' }
  ];
  

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadProfileData();
  }

  navigateToHome() {
    this.router.navigate(['/home-paciente']);
  }

  toggleEdit(field: any) {
    field.readOnly = !field.readOnly;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private loadProfileData() {
    this.apiService.getProfileData().subscribe({
      next: (data: any) => {
        this.fields.forEach((field) => {
          if (data[field.id] !== undefined) {
            field.value = data[field.id];
          }
        });
        if (data.profile_image) {
          this.profileImage = data.profile_image;
        }
      },
      error: (err) => {
        console.error('Error al cargar los datos del perfil:', err);
        if (err.status === 401) {
          alert('No estás autenticado. Por favor, inicia sesión nuevamente.');
          this.router.navigate(['/login']);
        } else {
          alert('No se pudieron cargar los datos del perfil. Intenta nuevamente.');
        }
      }
    });
  }
  proximaCita() {
    this.router.navigate(['/proxima-cita']);
  }
  cancelChanges() {
    this.loadProfileData(); // Restaura los datos originales
  }
  
  saveChanges() {
    const updatedData: Record<string, string | File | null> = {};

    this.fields.forEach((field) => {
      updatedData[field.id] = field.value;
    });

    if (this.selectedFile) {
      updatedData['profile_image'] = this.selectedFile;
    }

    const formData = new FormData();
    for (const key in updatedData) {
      if (updatedData[key] !== null) {
        formData.append(key, updatedData[key] as string | Blob);
      }
    }

    this.apiService.updateProfileData(formData).subscribe({
      next: () => alert('Datos actualizados correctamente'),
      error: (err) => alert('Error al actualizar los datos: ' + err.message),
    });
  }
}
