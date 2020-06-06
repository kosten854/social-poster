
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUrl,
  IsArray,
  ArrayMaxSize
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ButtonDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ maxLength: 30 })
  readonly text: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ maxLength: 150 })
  readonly url: string;
}
export class TgSendDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  @ApiProperty({ maxLength: 1024 })
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  readonly chatId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ default: 'markdownv2', example: 'markdownv2' })
  readonly parseMode: string = 'markdownv2';


  @IsUrl(undefined, { each: true })
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(10)
  @ApiPropertyOptional({ type: 'array', items: { type: 'string', example: 'https://picsum.photos/300/300' } })
  readonly photos: string[] = [];


  @IsArray()
  @IsOptional()
  @ArrayMaxSize(3)
  @ApiPropertyOptional({ type: ButtonDto, isArray: true })
  readonly buttons: ButtonDto[] = [];

}
