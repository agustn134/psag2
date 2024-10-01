import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualInformationComponent } from './visual-information.component';

describe('VisualInformationComponent', () => {
  let component: VisualInformationComponent;
  let fixture: ComponentFixture<VisualInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
