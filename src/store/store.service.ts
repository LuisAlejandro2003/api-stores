import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = new this.storeModel(createStoreDto);
    return newStore.save();
  }

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeModel.findById(id).exec();
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async findByOwnerId(ownerId: string): Promise<Store[]> {
    return this.storeModel.find({ ownerId }).exec();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const updatedStore = await this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .exec();
    if (!updatedStore) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return updatedStore;
  }

  async remove(id: string): Promise<void> {
    const result = await this.storeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
  }
}
