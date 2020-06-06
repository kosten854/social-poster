import { NotFoundException } from '@nestjs/common';

export class EntityFoundException extends NotFoundException {
  constructor(entity = 'entity', error?: string) {
    super(`error.${entity}.notFound`, error);
  }
}