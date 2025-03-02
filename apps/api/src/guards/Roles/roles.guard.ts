import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const Roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();
    if (!Roles) {
      return true;
    }
    if (Roles.includes(Role.Guest)) {
      const auth_token = request.cookies.pastenest_access_token;
      if (!auth_token) {
        return true;
      }
      const user = await this.jwtService.verify(auth_token, {});
      if (user) {
        request.user = user;
        return true;
      }
    }
    // console.log(Roles);
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;

    //  check matched roles with prisma +by matching roles and sers using function with matchroles() name
    return true;
  }
}
