import { TestBed, inject } from '@angular/core/testing';

import { TeacherManagementService } from './teacher-management.service';

describe('TeacherManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherManagementService]
    });
  });

  it('should be created', inject([TeacherManagementService], (service: TeacherManagementService) => {
    expect(service).toBeTruthy();
  }));
});
