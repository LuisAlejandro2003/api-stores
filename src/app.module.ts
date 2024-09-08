import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
 
    MongooseModule.forRoot(process.env.MONGODB_URI),
    OrdersModule,
    CatalogModule,
  ],
})
export class AppModule {}
