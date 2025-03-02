import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('posts')
  async signIn() {
    return 'this.authService.signIn(FindUserDto)';
  }
}
