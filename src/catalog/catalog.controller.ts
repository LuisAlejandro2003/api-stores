import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto'; 

@Controller('catalog')  
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  findAll() {
    return this.catalogService.findAll();  
  }

  @Post()
  create(@Body() CreateCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(CreateCatalogDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id); 
  }
}
