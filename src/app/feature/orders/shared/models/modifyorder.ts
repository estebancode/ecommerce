export class OrderModify {
    public poNumber: number;
    public shippingDate: Date;
    public shippingMethodCode: string;
    public shipTo: string;
    public facilityCode: string;
    public giftMessage: string;

    constructor(poNumber: number, shippingDate: Date, shippingMethodCode: string,
                shipTo: string, facilityCode: string, giftMessage: string) {
      this.poNumber = poNumber;
      this.shippingDate = shippingDate;
      this.shippingMethodCode = shippingMethodCode;
      this.shipTo = shipTo;
      this.facilityCode = facilityCode;
      this.giftMessage = giftMessage;
    }

  }
