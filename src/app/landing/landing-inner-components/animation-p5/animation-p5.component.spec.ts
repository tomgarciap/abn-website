import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationP5Component } from './animation-p5.component';

describe('AnimationP5Component', () => {
  let component: AnimationP5Component;
  let fixture: ComponentFixture<AnimationP5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationP5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationP5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
