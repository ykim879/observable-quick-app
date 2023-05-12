import { TestBed } from '@angular/core/testing';

import { BehaviorSubjectDataService } from './behaviorsubjectdata.service';

describe('BehaviorsubjectdataService', () => {
  let service: BehaviorSubjectDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorSubjectDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
