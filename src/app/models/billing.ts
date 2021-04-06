export class Billing {
    constructor(
      public orderId: String,
      public purchaseValue: Number,
      public numTable: Number,
      public office: string
    ){}
}