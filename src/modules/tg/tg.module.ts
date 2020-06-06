
import { Module } from '@nestjs/common';
import { TgService } from './tg.service';
import { TgController } from './tg.controller';


@Module({
  controllers: [TgController],
  providers: [TgService],
  exports: [],
  imports: [],
})
export class TgModule { }
