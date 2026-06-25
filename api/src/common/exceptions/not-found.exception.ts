import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class NotFoundException extends BusinessException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}