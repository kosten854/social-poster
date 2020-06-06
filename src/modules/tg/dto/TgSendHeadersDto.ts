
import {
  IsString,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
export class TgSendHeadersDto {


  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'default token' })
  readonly token: string;

}
