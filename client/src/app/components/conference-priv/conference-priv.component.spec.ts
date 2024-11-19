import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencePrivComponent } from './conference-priv.component';

describe('ConferencePrivComponent', () => {
  let component: ConferencePrivComponent;
  let fixture: ComponentFixture<ConferencePrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferencePrivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferencePrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
