import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { hash } from 'argon2';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async setRefreshTokenHash(userId: string, hash: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: hash },
    });
  }

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
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
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
