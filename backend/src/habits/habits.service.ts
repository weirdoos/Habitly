import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateHabitDto } from './dto/update.habit.dto.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async createHabit(userId: string, dto: CreateHabitDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException(`Пользователь с таким id не найден`);
    console.log(user);

    return this.prisma.habit.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        userId,
      },
    });
  }

  async getByUserId(userId: string) {
    return this.prisma.habit.findMany({ where: { userId } });
  }

  async updateHabit(userId: string, habitId: number, dto: UpdateHabitDto) {
    const habit = await this.prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit)
      throw new NotFoundException('привычки с таким id не существует');

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (habit?.userId !== userId)
      throw new NotFoundException('эта привычка не принадлежит вам');

    const data: Prisma.HabitUpdateInput = {};

    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.percentage !== undefined) data.percentage = dto.percentage;
    if (dto.isCompleted !== undefined) data.isCompleted = dto.isCompleted;
    if (dto.category !== undefined) data.category = dto.category;

    const updatedHabit = await this.prisma.habit.update({
      where: { id: habitId },
      data: data,
    });

    return true;
  }

  async deleteHabit(userId: string, habitId: number) {
    const habit = await this.prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit)
      throw new NotFoundException('привычки с таким id не существует');

    return this.prisma.habit.delete({
      where: { id: habitId },
    });
  }
}
