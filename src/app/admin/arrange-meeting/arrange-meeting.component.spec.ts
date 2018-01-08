import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeMeetingComponent } from './arrange-meeting.component';

describe('ArrangeMeetingComponent', () => {
  let component: ArrangeMeetingComponent;
  let fixture: ComponentFixture<ArrangeMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangeMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangeMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
