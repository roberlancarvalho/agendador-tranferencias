import { TestBed } from '@angular/core/testing';

import { Transferencia } from './transferencia';

describe('Transferencia', () => {
  let service: Transferencia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transferencia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
