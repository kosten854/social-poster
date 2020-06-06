
import {
  IsString,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { ConfigService } from 'src/shared/services/config.service';
const configService = new ConfigService()
export class VkSendHeadersDto {


  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'default token' })
  readonly token: string = configService.get('VK_TOKEN');

}
