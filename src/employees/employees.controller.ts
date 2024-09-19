import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response } from 'express';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Res() res: Response) {
    try {
      const newEmployee = await this.employeesService.create(createEmployeeDto);
      return res.status(HttpStatus.CREATED).json(newEmployee);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating employee', error: error.message });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK) // 200 OK
  async findAll(@Res() res: Response) {
    try {
      const employees = await this.employeesService.findAll();
      return res.status(HttpStatus.OK).json(employees);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching employees', error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const employee = await this.employeesService.findOne(id);
      return res.status(HttpStatus.OK).json(employee); // 200 OK
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Employee with ID ${id} not found` }); // 404 Not Found
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Res() res: Response) {
    try {
      const updatedEmployee = await this.employeesService.update(id, updateEmployeeDto);
      return res.status(HttpStatus.OK).json(updatedEmployee); // 200 OK
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Employee with ID ${id} not found` }); // 404 Not Found
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.employeesService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send(); // 204 No Content
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Employee with ID ${id} not found` }); // 404 Not Found
    }
  }
}
