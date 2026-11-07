import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HabitsService } from './habits.service.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update.habit.dto.js';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post('create')
  async createHabit(
    @Query('userId') userId: string,
    @Body() dto: CreateHabitDto,
  ) {
    this.habitsService.createHabit(userId, dto);
  }

  @Get('by-user-id')
  async getByUserId(@Query('userId') userId: string) {
    return this.habitsService.getByUserId(userId);
  }

  @Put('by-habit-id')
  async updateHabit(
    @Query('userId') userId: string,
    @Query('habitId') habitId: number,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.habitsService.updateHabit(userId, +habitId, dto);
  }

  @Delete('delete')
  async deleteHabit(
    @Query('userId') userId: string,
    @Query('habitId') habitId: number,
  ) {
    return this.habitsService.deleteHabit(userId, +habitId);
  }
}
