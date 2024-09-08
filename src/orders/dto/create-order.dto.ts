export class CreateOrderDto {
    readonly productId: string;
    readonly quantity: number;
    readonly totalPrice: number;
    readonly customerName: string;
    readonly customerAddress: string;
    readonly status: string;
  }
  