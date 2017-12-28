import { TestBed, inject } from '@angular/core/testing';

import { CourseManagementService } from './course-management.service';

describe('CourseManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseManagementService]
    });
  });

  it('should be created', inject([CourseManagementService], (service: CourseManagementService) => {
    expect(service).toBeTruthy();
  }));
});
