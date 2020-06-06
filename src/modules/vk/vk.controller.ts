import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post, Body, Headers
} from '@nestjs/common';
import { VkService } from './vk.service';
import { VkSendResponseDto } from './dto/VkSendResponseDto';
import { VkSendDto } from './dto/VkSendDto';
import { VkSendHeadersDto } from './dto/VkSendHeadersDto';

@ApiTags('VK')
@Controller('vk')
export class VkController {
  constructor(
    private readonly vkService: VkService
  ) { }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Отправить сообщение' })
  @ApiOkResponse({
    description: 'Результат отправки',
    type: VkSendResponseDto,
  })
  async send(
    @Body() body: VkSendDto,
    @Headers() headers: VkSendHeadersDto,
  ): Promise<VkSendResponseDto> {
    const response = await this.vkService.send(body, headers);
    return response;
  }

}
