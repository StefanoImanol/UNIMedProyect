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
}
