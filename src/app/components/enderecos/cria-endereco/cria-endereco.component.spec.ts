import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaEnderecoComponent } from './cria-endereco.component';

describe('CriaEnderecoComponent', () => {
  let component: CriaEnderecoComponent;
  let fixture: ComponentFixture<CriaEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriaEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
