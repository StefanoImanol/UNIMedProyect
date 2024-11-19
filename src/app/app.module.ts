import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { PerfilPacienteComponent } from './perfil-paciente/perfil-paciente.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';
import { ProximaCitaComponent } from './proxima-cita/proxima-cita.component';
import { CancelarComponent } from './cancelar/cancelar.component';
import { ReprogramarCitaComponent } from './reprogramar-cita/reprogramar-cita.component';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { PerfilMedicoComponent } from './perfil-medico/perfil-medico.component';
import { VerAgendaComponent } from './ver-agenda/ver-agenda.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { CitasComponent } from './citas/citas.component';
import { ModificarEspecialidadesComponent } from './modificar-especialidades/modificar-especialidades.component';
import { ModificarHorarioComponent } from './modificar-horario/modificar-horario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AgendarCitaComponent,
    PerfilPacienteComponent,
    ConfirmacionComponent,
    ConfirmacionCitaComponent,
    ProximaCitaComponent,
    CancelarComponent,
    ReprogramarCitaComponent,
    HomePacienteComponent,
    HomeMedicoComponent,// Asegúrate de declarar todos los componentes aquí
    PerfilMedicoComponent,
    VerAgendaComponent,
    HomeAdministradorComponent,
    CitasComponent,
    ModificarEspecialidadesComponent,
    ModificarHorarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule // Asegúrate de importar CommonModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
