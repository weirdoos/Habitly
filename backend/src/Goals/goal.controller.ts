import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update.habit.dto.js';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.js';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(private readonly habitsService: GoalService) {}

  @Post('create')
  async createHabit(
    @Req() req: { user: { userId: string; email: string; username: string } },
    @Body() dto: CreateHabitDto,
  ) {
    this.habitsService.createHabit(req.user.userId, dto);
  }

  @Get('by-user-id')
  async getByUserId(
    @Req() req: { user: { userId: string; email: string; username: string } },
  ) {
    return this.habitsService.getByUserId(req.user.userId);
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
