import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop({ type: String, required: true })
  ownerId: string;  // Relacionado con el usuario
}

export const StoreSchema = SchemaFactory.createForClass(Store);
