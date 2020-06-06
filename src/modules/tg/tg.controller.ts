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
import { TgService } from './tg.service';
import { TgSendResponseDto } from './dto/TgSendResponseDto';
import { TgSendDto } from './dto/TgSendDto';
import { TgSendHeadersDto } from './dto/TgSendHeadersDto';

@ApiTags('TG')
@Controller('tg')
export class TgController {
  constructor(
    private readonly tgService: TgService
  ) { }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Отправить сообщение' })
  @ApiOkResponse({
    description: 'Результат отправки',
    type: TgSendResponseDto,
  })
  async send(
    @Body() body: TgSendDto,
    @Headers() headers: TgSendHeadersDto,

  ): Promise<TgSendResponseDto> {
    const response = await this.tgService.send(body, headers);
    return response;
  }

}
