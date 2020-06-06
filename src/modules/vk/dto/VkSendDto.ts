
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VkSendDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  @ApiProperty({ maxLength: 5000 })
  readonly text: string;


  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'markdown' })
  readonly description: string = 'markdown';

}
