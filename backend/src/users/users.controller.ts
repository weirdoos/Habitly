import { Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Body } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put('put')
  async putUser(@Query('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.putUser(id, dto);
  }
}
