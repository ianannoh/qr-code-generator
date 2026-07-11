import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormspageComponent } from './formspage.component';

describe('FormspageComponent', () => {
  let component: FormspageComponent;
  let fixture: ComponentFixture<FormspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
