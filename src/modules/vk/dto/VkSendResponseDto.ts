
import { ApiProperty } from '@nestjs/swagger';

export class VkSendResponseDto {

  @ApiProperty({ type: 'boolean' })
  readonly status: boolean;
  constructor(response: any) {
    this.status = response.status
  }
}
