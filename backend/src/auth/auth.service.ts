import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userService.findByEmail(dto.email);
    console.log(existing);
    if (existing) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const user = await this.userService.createUser(dto);

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('почта или пароль не совпадают');

    const ok = bcrypt.compare(dto.password, user.password);

    if (!ok) throw new UnauthorizedException('почта или пароль не совпадают');

    return this.issueTokens(user);
  }

  async logout(userId: string) {
    return this.userService.setRefreshTokenHash(userId, null);
  }

  async refresh(refreshToken: string) {
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh-токен невалиден');
    }

    const user = await this.userService.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Сессия истекла');
    }

    const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!matches) {
      throw new UnauthorizedException('Токен отозван');
    }

    return this.issueTokens(user);
  }

  private async issueTokens(user: {
    id: string;
    email: string;
    username: string;
  }) {
    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      {
        expiresIn: this.config.get<string>('ACCESS_EXPIRE', '15m') as any,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('REFRESH_EXPIRE', '7d') as any,
      },
    );

    const refreshHash = await bcrypt.hash(refreshToken, 3);
    await this.userService.setRefreshTokenHash(user.id, refreshHash);

    return {
      user: { id: user.id, email: user.email, name: user.username },
      accessToken,
      refreshToken,
    };
  }
}
