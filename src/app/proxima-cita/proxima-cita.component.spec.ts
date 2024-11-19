import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximaCitaComponent } from './proxima-cita.component';

describe('ProximaCitaComponent', () => {
  let component: ProximaCitaComponent;
  let fixture: ComponentFixture<ProximaCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximaCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximaCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
