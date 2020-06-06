import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class ParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiPropertyOptional({
    minimum: 1,
  })
  readonly id: number;
}
