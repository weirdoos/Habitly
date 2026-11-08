import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GoalService } from './goal.service.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update.habit.dto.js';

@Controller('habits')
export class GoalController {
  constructor(private readonly habitsService: GoalService) {}

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
    @Query('habitId') habitId: string,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.habitsService.updateHabit(userId, habitId, dto);
  }

  @Delete('delete')
  async deleteHabit(
    @Query('userId') userId: string,
    @Query('habitId') habitId: string,
  ) {
    return this.habitsService.deleteHabit(userId, habitId);
  }
}
