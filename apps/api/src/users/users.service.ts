import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashPassword } from 'src/lib/utils';
import { FindUserDto } from './dto/find-user.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: await hashPassword(createUserDto.password),
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'User with email or username already exists.',
          );
        }
        if (error.code === 'P2001') {
          throw new NotFoundException('Requested resources not found');
        }
      }
      throw error;
    }
  }

  async findOne(FindUserDto: FindUserDto): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: FindUserDto.email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
