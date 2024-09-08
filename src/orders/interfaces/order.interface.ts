export interface Order {
    id?: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    customerName: string;
    customerAddress: string;
    status: string;
  }
  