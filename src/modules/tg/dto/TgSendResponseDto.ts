
import { ApiProperty } from '@nestjs/swagger';

export class TgSendResponseDto {

  @ApiProperty({ type: 'boolean' })
  readonly ok: boolean;

  @ApiProperty({ type: 'any' })
  readonly result: any;

  constructor(response: any) {
    this.ok = response.ok
    this.result = response.result

  }
}
