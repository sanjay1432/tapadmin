import { TestBed, inject } from '@angular/core/testing';

import { ParentManagementService } from './parent-management.service';

describe('ParentManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentManagementService]
    });
  });

  it('should be created', inject([ParentManagementService], (service: ParentManagementService) => {
    expect(service).toBeTruthy();
  }));
});
