import { Injectable } from '@nestjs/common';
import { VkSendResponseDto } from './dto/VkSendResponseDto';
import { VkSendHeadersDto } from './dto/VkSendHeadersDto';
import { VkSendDto } from './dto/VkSendDto';


@Injectable()
export class VkService {
  // constructor(
  // ) { }

  async send(
    body: VkSendDto,
    headers: VkSendHeadersDto,
  ): Promise<VkSendResponseDto> {
    console.log("VkService -> body", body)
    console.log("VkService -> headers", headers)

    return new VkSendResponseDto({ status: true })

  }
}
