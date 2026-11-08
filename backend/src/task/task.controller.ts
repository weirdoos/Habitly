import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('by-goal-id')
  getByGoalId(@Query('goalId') goalId: string) {
    return this.taskService.getByGoalId(goalId);
  }

  @Post('create')
  createTask(@Query('goalId') goalId: string, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(goalId, dto);
  }
}
