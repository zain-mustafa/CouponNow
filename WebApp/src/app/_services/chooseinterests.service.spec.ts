import { TestBed } from '@angular/core/testing';

import { ChooseinterestsService } from './chooseinterests.service';

describe('ChooseinterestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChooseinterestsService = TestBed.get(ChooseinterestsService);
    expect(service).toBeTruthy();
  });
});
