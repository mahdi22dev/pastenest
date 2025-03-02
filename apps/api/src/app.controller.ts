import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextFunction, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
