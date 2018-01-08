import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStudentComponent } from './parent-student.component';

describe('ParentStudentComponent', () => {
  let component: ParentStudentComponent;
  let fixture: ComponentFixture<ParentStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
