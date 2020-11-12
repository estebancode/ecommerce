export class StockModify {
    public id: number;
    public inventory: number;
    public slot: string;
    public facility: string;
    public productName: string;
    public duedate: Date;

    constructor(id: number, inventory: number, slot: string, facility: string, productName: string, duedate: Date) {
      this.id = id;
      this.inventory = inventory;
      this.slot = slot;
      this.facility = facility;
      this.productName = productName;
      this.duedate = duedate;
    }

  }
