export class OrderModify {
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

    constructor(poNumber: number, shippingDate: Date, shippingMethodCode: string,
                shipTo: string, facilityCode: string, giftMessage: string,
                shipToAddress: string, shipToCity: string, shipToState: string, units: number) {
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
    }

  }
