import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getProfileData() {
    return this.http.get('http://127.0.0.1:8000/api/profile-data/', {
      withCredentials: true,
    });
  }

  updateProfileData(profileData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/update-profile/`, profileData);
}


   // Obtener datos del paciente autenticado
   obtenerDatosPaciente(): Observable<any> {
    return this.http.get(`${this.baseUrl}/datos-paciente/`);
  }
   // **CitaService**
   obtenerEspecialidades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/especialidades/`);
  }


  obtenerMedicosPorEspecialidad(especialidadId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/medicos/${especialidadId}/`);
  }

  obtenerHorariosDisponibles(medicoId: number, fecha: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/horarios/${medicoId}/${fecha}/`);
  }
  

  crearCita(citaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/citas/`, citaData);
  }

  // **Otros servicios pueden ir aquí**
  // Ejemplo:
  obtenerDatosUsuario(userId: number) {
    return this.http.get(`${this.baseUrl}/usuarios/${userId}/`);
  }
  obtenerProximaCita(): Observable<any> {
    return this.http.get(`${this.baseUrl}/proxima-cita/`);
  }

  cancelarCita(citaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/cancelar-cita/${citaId}/`);
  }   
  getProximaCita(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/proxima-cita/`);
  }
  reprogramarCita(citaId: number, nuevaCitaData: { fecha: string; hora: string }) {
    return this.http.put(`${this.baseUrl}/api/reprogramar-cita/${citaId}/`, nuevaCitaData);
  }
  obtenerAgendaMedico(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/agenda-medico/`);
  }
    // Métodos exclusivos para el médico
    getMedicoProfileData(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/medico-profile-data/`);
    }    
    
    updateMedicoProfile(profileData: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/api/update-medico-profile/`, profileData);
    }
    
    updateMedicoProfileImage(imageData: FormData): Observable<any> {
      return this.http.put(`${this.baseUrl}/api/update-medico-image/`, imageData);
    }
    
    obtenerTodasCitas(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/todas-citas/`);
    }
    
    cambiarEstadoCita(citaId: number, data: any): Observable<any> {
      return this.http.patch(`${this.baseUrl}/api/cambiar-estado-cita/${citaId}/`, data);
    }
    
    crearEspecialidad(nombre: string) {
      return this.http.post(`${this.baseUrl}/api/especialidades/crear/`, { nombre });
    }
    
    
    eliminarEspecialidad(especialidadId: number) {
      return this.http.delete(`${this.baseUrl}/api/especialidades/eliminar/${especialidadId}/`);
    }
    
    
    obtenerEspecialidad() {
      return this.http.get<{ especialidad_id: number; nombre_especialidad: string }[]>(
        `${this.baseUrl}/api/especialidades/`
      );
    }
    

    obtenerMedicosEspecialidades(especialidadId: number) {
      return this.http.get(`${this.baseUrl}/api/medicos/${especialidadId}/`);
    }
    
    crearMedico(data: any) {
      return this.http.post(`${this.baseUrl}/api/medicos/crear/`, data);
  }
  
    
  editarMedico(medicoId: number, data: any) {
    return this.http.put(`${this.baseUrl}/api/medicos/editar/${medicoId}/`, data);
}
    
eliminarMedico(medicoId: number) {
  return this.http.delete(`${this.baseUrl}/api/medicos/eliminar/${medicoId}/`);
}
obtenerEspecialida(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}api/especialidades/${id}`);
}

    
    
  
  
  
    
    
  
}
