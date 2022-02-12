import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSeparatorComponent } from './component-separator.component';

describe('ComponentSeparatorComponent', () => {
  let component: ComponentSeparatorComponent;
  let fixture: ComponentFixture<ComponentSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentSeparatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
