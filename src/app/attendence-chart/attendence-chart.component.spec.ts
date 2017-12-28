import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceChartComponent } from './attendence-chart.component';

describe('AttendenceChartComponent', () => {
  let component: AttendenceChartComponent;
  let fixture: ComponentFixture<AttendenceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendenceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
