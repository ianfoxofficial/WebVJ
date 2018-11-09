import { TestBed } from '@angular/core/testing';

import { AnimationStepperService } from './animation-stepper.service';

describe('AnimationStepperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimationStepperService = TestBed.get(AnimationStepperService);
    expect(service).toBeTruthy();
  });
});
