import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getByGoalId(goalId: string) {
    return this.prisma.task.findMany({ where: { goalId } });
  }

  async createTask(goalId: string, dto: CreateTaskDto) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });

    if (!goal) throw new NotFoundException('такой цели не существует');

    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        goalId,
      },
    });

    return task;
  }
}
