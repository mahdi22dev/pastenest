import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Data Validation failed');
    }
  }
}
export class ToNumber implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = Number(value);
      return parsedValue;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Data Validation failed');
    }
  }
}
