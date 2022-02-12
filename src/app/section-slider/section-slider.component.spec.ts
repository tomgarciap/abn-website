import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSliderComponent } from './section-slider.component';

describe('SectionSliderComponent', () => {
  let component: SectionSliderComponent;
  let fixture: ComponentFixture<SectionSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
