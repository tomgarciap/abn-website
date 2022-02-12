import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinousSliderComponent } from './continous-slider.component';

describe('ContinousSliderComponent', () => {
  let component: ContinousSliderComponent;
  let fixture: ComponentFixture<ContinousSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinousSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinousSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
