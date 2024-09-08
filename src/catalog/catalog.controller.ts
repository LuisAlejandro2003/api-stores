import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateItemDto } from './dto/create-item.dto'; 

@Controller('catalog')  
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  findAll() {
    return this.catalogService.findAll();  
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.catalogService.create(createItemDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id); 
  }
}
