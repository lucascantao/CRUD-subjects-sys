import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortariaComponent } from './portaria.component';

describe('PortariaComponent', () => {
  let component: PortariaComponent;
  let fixture: ComponentFixture<PortariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
