import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mahdi!';
  }
  getSay(): string {
    return 'Say My Name!';
  }
}
