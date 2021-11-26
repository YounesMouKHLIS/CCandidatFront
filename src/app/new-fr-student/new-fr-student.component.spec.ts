import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFrStudentComponent } from './new-fr-student.component';

describe('NewFrStudentComponent', () => {
  let component: NewFrStudentComponent;
  let fixture: ComponentFixture<NewFrStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFrStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFrStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
