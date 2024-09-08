import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from './interfaces/catalog.interface'; // Define la interfaz Catalog
import { CreateItemDto } from './dto/create-item.dto'; // Suponiendo que tienes un DTO para crear un item

@Injectable()
export class CatalogService {
  constructor(@InjectModel('Catalog') private readonly catalogModel: Model<Catalog>) {}

  // Obtener todos los productos del catálogo
  async findAll(): Promise<Catalog[]> {
    return await this.catalogModel.find().exec();
  }

  // Crear un nuevo producto en el catálogo
  async create(createItemDto: CreateItemDto): Promise<Catalog> {
    const newItem = new this.catalogModel(createItemDto);
    return await newItem.save();
  }

  // Eliminar un producto por su ID
  async remove(id: string): Promise<Catalog> {
    const deletedItem = await this.catalogModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return deletedItem;
  }
}
