export class CrudUtil {
    isEditActive: boolean = false;
    isDeleteActive: boolean = false;
    checkboxes = { 'checked': false, items: {} };
    data: any[];
    selected: number;

    constructor(data: any[]) {
        this.data = data;
    }

    checkRow(value, id) {
        if (!this.data) {
            return;
        }
        else {
            // Set item checked
            this.checkboxes.items[id] = value;
            this.selected = id;
        }
        this.setCrudActions(this.getSelectedItemCount());
    }

    checkAll(value) {
        this.data.forEach((row) => {
            if (row != null) {
                this.checkboxes.items[row.id] = value;
            }
        })       
        this.setCrudActions(this.getSelectedItemCount());
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

    // Get number of selected items
    getSelectedItemCount() {
        return this.getSelectedItemIds().length;
    }

    // Reset selected items
    resetSelectedItems() {
        this.checkboxes = { 'checked': false, items: {} };
        this.setCrudActions(this.getSelectedItemCount());
    }

    // Toggle crud actions
    setCrudActions(itemCount: number) {
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