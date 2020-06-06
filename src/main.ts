import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as RateLimit from 'express-rate-limit';
import * as compression from 'compression';

import { HttpExceptionFilter } from './filters/bad-request.filter';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './viveo-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
    },
  );
  app.enable('trust proxy');
  // отключить если в nginx будут эти настройки

  app.use(compression());
  // логгер
  app.use(morgan('combined'));

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: false,
      },
    }),
  );

  const configService = app.select(SharedModule).get(ConfigService);

  if (['development', 'qa'].includes(configService.nodeEnv)) {
    setupSwagger(app);
  }

  if (!['test', 'qa', 'development'].includes(configService.nodeEnv)) {
    app.use(helmet());
    app.use(
      new RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  const port = configService.getNumber('APP_PORT');
  const host = configService.get('APP_HOST');
  await app.listen(port, host);

  console.info(`🚀 Api documentation on http://${host}:${port}/documentation`);
}
bootstrap();
