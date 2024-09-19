import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Response } from 'express';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  async create(@Body() createStoreDto: CreateStoreDto, @Res() res: Response) {
    try {
      const newStore = await this.storeService.create(createStoreDto);
      return res.status(HttpStatus.CREATED).json(newStore);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating store', error: error.message });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK) // 200 OK
  async findAll(@Res() res: Response) {
    try {
      const stores = await this.storeService.findAll();
      return res.status(HttpStatus.OK).json(stores);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching stores', error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const store = await this.storeService.findOne(id);
      return res.status(HttpStatus.OK).json(store); // 200 OK
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Store with ID ${id} not found` }); // 404 Not Found
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto, @Res() res: Response) {
    try {
      const updatedStore = await this.storeService.update(id, updateStoreDto);
      return res.status(HttpStatus.OK).json(updatedStore); // 200 OK
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Store with ID ${id} not found` }); // 404 Not Found
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.storeService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send(); // 204 No Content
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Store with ID ${id} not found` }); // 404 Not Found
    }
  }
}
