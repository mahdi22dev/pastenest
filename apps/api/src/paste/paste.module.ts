import { Module } from '@nestjs/common';
import { PasteService } from './paste.service';
import { PasteController } from './paste.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from 'src/auth/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [PasteController],
  providers: [PasteService, PrismaService, AuthService, UsersService],
})
export class PasteModule {}
