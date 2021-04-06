export class AttachItemBilling {
    constructor(
        public billing_id: string,
        public item_id: string,
        public amount: number,
        public size: string
    ) {}
  }