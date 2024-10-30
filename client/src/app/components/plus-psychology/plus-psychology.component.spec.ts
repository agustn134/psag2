import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusPsychologyComponent } from './plus-psychology.component';

describe('PlusPsychologyComponent', () => {
  let component: PlusPsychologyComponent;
  let fixture: ComponentFixture<PlusPsychologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlusPsychologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusPsychologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
