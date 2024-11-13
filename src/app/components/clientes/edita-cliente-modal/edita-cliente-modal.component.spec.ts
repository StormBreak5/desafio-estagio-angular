import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaClienteModalComponent } from './edita-cliente-modal.component';

describe('EditaClienteModalComponent', () => {
  let component: EditaClienteModalComponent;
  let fixture: ComponentFixture<EditaClienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaClienteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
