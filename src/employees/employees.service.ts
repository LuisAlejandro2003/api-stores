import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();  // Usamos el _id de MongoDB
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updatedEmployee;
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
