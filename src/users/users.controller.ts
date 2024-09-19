import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating user', error: error.message });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK) // 200 OK
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching users', error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      return res.status(HttpStatus.OK).json(user); // 200 OK
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `User with ID ${id} not found` }); // 404 Not Found
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      return res.status(HttpStatus.OK).json(updatedUser); // 200 OK
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `User with ID ${id} not found` }); // 404 Not Found
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.usersService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send(); // 204 No Content
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `User with ID ${id} not found` }); // 404 Not Found
    }
  }
}
