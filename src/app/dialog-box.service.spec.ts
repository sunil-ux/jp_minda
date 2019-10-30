import { TestBed } from '@angular/core/testing';

import { DialogBoxService } from './dialog-box.service';

describe('DialogBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogBoxService = TestBed.get(DialogBoxService);
    expect(service).toBeTruthy();
  });
});
