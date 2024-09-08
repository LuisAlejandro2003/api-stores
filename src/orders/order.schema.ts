import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
});
