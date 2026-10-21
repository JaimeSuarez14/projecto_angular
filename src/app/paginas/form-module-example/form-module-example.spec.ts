import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModuleExample } from './form-module-example';

describe('FormModuleExample', () => {
  let component: FormModuleExample;
  let fixture: ComponentFixture<FormModuleExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModuleExample],
    }).compileComponents();

    fixture = TestBed.createComponent(FormModuleExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
