import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEspecialidadesComponent } from './modificar-especialidades.component';

describe('ModificarEspecialidadesComponent', () => {
  let component: ModificarEspecialidadesComponent;
  let fixture: ComponentFixture<ModificarEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarEspecialidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
