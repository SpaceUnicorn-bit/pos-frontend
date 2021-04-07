export class Billing {
    constructor(
      public orderId: String,
      public purchaseValue: Number,
      public numTable: String,
      public paid: Boolean,
      public office: string
    ){}
}