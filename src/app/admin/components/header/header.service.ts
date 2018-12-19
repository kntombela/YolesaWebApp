import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _query: string = '';

  constructor() { }

  set query(q: string) {
    this._query = q;
  }

  get query(): string {
    return this._query;
  }
}
