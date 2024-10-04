import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtComponent } from './yt.component';

describe('YtComponent', () => {
  let component: YtComponent;
  let fixture: ComponentFixture<YtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
