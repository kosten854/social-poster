/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { TgSendResponseDto } from './dto/TgSendResponseDto';
import { TgSendHeadersDto } from './dto/TgSendHeadersDto';
import { TgSendDto } from './dto/TgSendDto';

import wretch from "wretch"
import { Wretcher } from "wretch"

wretch().polyfills({
  fetch: require("node-fetch"),
  URLSearchParams: require("url").URLSearchParams
})
import { ConfigService } from 'src/shared/services/config.service';

@Injectable()
export class TgService {

  constructor(private configService: ConfigService) {


  }

  private tgWretcher = wretch('https://api.telegram.org/bot')

  async send(
    body: TgSendDto,
    headers: TgSendHeadersDto,
  ): Promise<TgSendResponseDto> {
    const bot = await this.tgWretcher.url(headers.token || this.configService.telegramConfig.token)
    return new TgSendResponseDto(body.photos.length ? await this.sendMediaGroup(bot, body) : await this.sendTextMessage(bot, body))
  }

  private sendTextMessage(wretcher: Wretcher, body: TgSendDto): Promise<{ [key: string]: any; }> {
    return wretcher.url('/sendMessage').post(
      {
        chat_id: body.chatId,
        text: body.text,
        parse_mode: body.parseMode,
        reply_markup: {
          inline_keyboard: [
            body.buttons
          ]

        }
      }).json()
  }

  private async sendMediaGroup(wretcher: Wretcher, body: TgSendDto): Promise<{ [key: string]: any; }> {
    const result = await wretcher.url('/sendMediaGroup').post(
      {
        chat_id: body.chatId,
        media: body.photos.map((it, i) => {
          const data = {
            type: 'photo',
            media: it,
            caption: undefined,
            parse_mode: undefined,
          }
          if (i === 0 && !body.buttons.length) {
            data.caption = body.text
            data.parse_mode = body.parseMode
          }
          return data
        }),
        reply_markup: {
          inline_keyboard: [
            body.buttons
          ]
        }
      }
    ).json()


    if (body.buttons.length) {
      const textResult = await this.sendTextMessage(wretcher, <TgSendDto>{ ...body, photos: [] })
      if (textResult?.ok) {
        result.result.push(textResult.result)
      }

    }
    return result
  }
}
