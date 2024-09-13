import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './store/store.module';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/store'),
    StoreModule,
    EmployeesModule,
    UsersModule,
  ],
})
export class AppModule {}
