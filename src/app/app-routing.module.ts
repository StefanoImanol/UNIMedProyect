import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { PerfilPacienteComponent } from './perfil-paciente/perfil-paciente.component'; // Asegúrate de importar el componente
import { HomePacienteComponent } from './home-paciente/home-paciente.component'; // Asegúrate de importar el componente
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';
import { ProximaCitaComponent } from './proxima-cita/proxima-cita.component';
import { CancelarComponent } from './cancelar/cancelar.component';
import { ReprogramarCitaComponent } from './reprogramar-cita/reprogramar-cita.component';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { PerfilMedicoComponent } from './perfil-medico/perfil-medico.component';
import { VerAgendaComponent } from './ver-agenda/ver-agenda.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { CitasComponent } from './citas/citas.component';
import { ModificarEspecialidadesComponent } from './modificar-especialidades/modificar-especialidades.component';
import { ModificarHorarioComponent } from './modificar-horario/modificar-horario.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: 'perfil-paciente', component: PerfilPacienteComponent },
  { path: 'home-paciente', component: HomePacienteComponent, canActivate: [AuthGuard] },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'confirmacion-cita', component: ConfirmacionCitaComponent },
  { path: 'proxima-cita', component: ProximaCitaComponent },
  { path: 'cancelar', component: CancelarComponent},
  { path: 'reprogramar-cita', component: ReprogramarCitaComponent},
  { path: 'home-medico', component: HomeMedicoComponent },
  { path: 'perfil-medico', component: PerfilMedicoComponent },
  { path: 'ver-agenda', component: VerAgendaComponent },
  { path: 'home-administrador', component: HomeAdministradorComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'modificar-especialidades', component: ModificarEspecialidadesComponent },
  { path: 'modificar-horario/:especialidad', component: ModificarHorarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
