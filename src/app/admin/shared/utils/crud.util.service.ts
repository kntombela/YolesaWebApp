import { Injectable } from '@angular/core';
import { FilterSortService } from 'src/app/core/filter-sort.service';

@Injectable({
  providedIn: 'root'
})
export class CrudUtilService {

  isEditActive: boolean = false;
  isDeleteActive: boolean = false;
  checkboxes = { 'checked': false, items: {} };
  data: any[];
  filteredData: any[];
  selected: number;
  query: '';

  constructor(public fs: FilterSortService) { }

  checkRow(value, id) {
    if (!this.data) {
      return;
    }
    else {
      // Set item checked
      this.checkboxes.items[id] = value;
      this.selected = id;
    }
    this._setCrudActions(this.getSelectedItemCount());
  }

  checkAllRows(value) {
    this.data.forEach((row) => {
      if (row != null) {
        this.checkboxes.items[row.id] = value;
      }
    })
    this._setCrudActions(this.getSelectedItemCount());
  }

  // Get number of selected items
  getSelectedItemCount() {
    return this.getSelectedItemIds().length;
  }

  // Reset selected items
  resetSelectedItems() {
    this.checkboxes = { 'checked': false, items: {} };
    this._setCrudActions(this.getSelectedItemCount());
  }

  // Get array of selected rows
  getSelectedItemIds(): any {
    let checked = [];
    if (this.data) {
      this.data.forEach((row) => {
        if (this.checkboxes.items[row.id]) {
          checked.push(row.id);
        }
      })
    }
    return checked;
  }

  search() {
    this.filteredData = this.fs.search(this.data, this.query, 'id');
  }

  resetQuery() {
    this.query = '';
    this.filteredData = this.data;
  }

  // Toggle crud actions
  private _setCrudActions(itemCount: number) {
    if (itemCount > 1) {
      this.isEditActive = false;
      this.isDeleteActive = true;
    } else if (itemCount == 1) {
      this.isEditActive = true;
      this.isDeleteActive = true;
    } else {
      this.isEditActive = false;
      this.isDeleteActive = false;
    }
  }
}
