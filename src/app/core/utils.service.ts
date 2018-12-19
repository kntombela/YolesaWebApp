import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

}
