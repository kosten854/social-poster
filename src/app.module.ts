import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

// import { RedisModule } from 'nestjs-redis';

import { contextMiddleware } from './middlewares';

import { ConfigService } from './shared/services/config.service';

import { SharedModule } from './shared/shared.module';

import { TgModule } from './modules/tg/tg.module';
import { VkModule } from './modules/vk/vk.module';

// import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    // RedisModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => configService.redisConfig,
    //   inject: [ConfigService],
    // }),

    TgModule,
    SharedModule,
    VkModule,
  ],
  exports: [],
  // controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
