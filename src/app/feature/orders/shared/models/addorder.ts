export class OrderSave {
    public poNumber: number;
    public shippingDate: Date;
    public shippingMethodCode: string;
    public shipTo: string;
    public facilityCode: string;
    public giftMessage: string;
    public shipToAddress: string;
    public shipToCity: string;
    public shipToState: string;
    public units: number;
    public sku: number;
    public item: string;
    public unitPrice: number;
    public productName: string;


    constructor(poNumber: number, shippingDate: Date, shippingMethodCode: string,
                shipTo: string, facilityCode: string, giftMessage: string,
                shipToAddress: string, shipToCity: string, shipToState: string,
                units: number, sku: number, item: string, unitPrice: number, productName: string) {
      this.poNumber = poNumber;
      this.shippingDate = shippingDate;
      this.shippingMethodCode = shippingMethodCode;
      this.shipTo = shipTo;
      this.facilityCode = facilityCode;
      this.giftMessage = giftMessage;
      this.shipToAddress = shipToAddress;
      this.shipToCity = shipToCity;
      this.shipToState = shipToState;
      this.units = units;
      this.sku = sku;
      this.item = item;
      this.unitPrice = unitPrice;
      this.productName = productName;
    }
  }
