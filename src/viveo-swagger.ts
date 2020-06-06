import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { name, version } from '../package.json';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(name)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}
