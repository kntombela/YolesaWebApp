import { TestBed, inject } from '@angular/core/testing';

import { CrudUtilService } from './crud.util.service';

describe('Crud.UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudUtilService]
    });
  });

  it('should be created', inject([CrudUtilService], (service: CrudUtilService) => {
    expect(service).toBeTruthy();
  }));
});
