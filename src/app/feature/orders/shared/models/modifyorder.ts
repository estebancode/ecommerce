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
    public units: number | null;
    public sku: number;

    constructor(poNumber: number, shippingDate: Date, shippingMethodCode: string,
                shipTo: string, facilityCode: string, giftMessage: string,
                shipToAddress: string, shipToCity: string, shipToState: string, sku: number) {
      this.poNumber = poNumber;
      this.shippingDate = shippingDate;
      this.shippingMethodCode = shippingMethodCode;
      this.shipTo = shipTo;
      this.facilityCode = facilityCode;
      this.giftMessage = giftMessage;
      this.shipToAddress = shipToAddress;
      this.shipToCity = shipToCity;
      this.shipToState = shipToState;
      this.sku = sku;
    }

    public createWithoutUnits(order: OrderModify) {

      const newWithoutUnits = {
        poNumber: order.poNumber,
        shippingDate : order.shippingDate,
        shippingMethodCode : order.shippingMethodCode,
        shipTo : order.shipTo,
        facilityCode : order.facilityCode,
        giftMessage : order.giftMessage,
        shipToAddress : order.shipToAddress,
        shipToCity : order.shipToCity,
        shipToState : order.shipToState,
        sku : order.sku,
        units : null,
      };

      return newWithoutUnits;
  }

  }
