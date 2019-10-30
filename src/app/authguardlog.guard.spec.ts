import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardlogGuard } from './authguardlog.guard';

describe('AuthguardlogGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardlogGuard]
    });
  });

  it('should ...', inject([AuthguardlogGuard], (guard: AuthguardlogGuard) => {
    expect(guard).toBeTruthy();
  }));
});
