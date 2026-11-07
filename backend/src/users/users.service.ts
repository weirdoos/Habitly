import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { hash } from 'argon2';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto) {
    const { username, email, password } = dto;
    const hashedPassword = await hash(password);

    try {
      const user = this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return true;
  }

  async putUser(id: string, dto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {};

    if (dto.email !== undefined) data.email = dto.email;
    if (dto.username !== undefined) data.username = dto.username;
    if (dto.password !== undefined) data.password = dto.password;

    try {
      const user = this.prisma.user.update({
        where: { id },
        data,
      });

      return user;
    } catch (e) {
      throw e;
    }
  }
}
