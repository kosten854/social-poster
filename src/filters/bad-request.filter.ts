import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = exception.getStatus();
    const r = <any>exception.getResponse();

    if (Array.isArray(r.message) && r.message[0] instanceof ValidationError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      const validationErrors = <ValidationError[]>r.message;
      this._validationFilter(validationErrors);
    }

    r.statusCode = statusCode;
    r.error = STATUS_CODES[statusCode];

    response.status(statusCode).json(r);
  }

  private _validationFilter(validationErrors: ValidationError[]) {
    for (const validationError of validationErrors) {
      for (const [constraintKey, constraint] of Object.entries(
        validationError.constraints,
      )) {
        if (!constraint) {
          // convert error message to error.fields.{key} syntax for i18n translation
          validationError.constraints[
            constraintKey
          ] = `error.fields.${constraintKey}`;
        }
      }
      if (validationError.children.length) {
        this._validationFilter(validationError.children);
      }
    }
  }
}
