import { Module, Global, HttpModule } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [ConfigService, ValidatorService, GeneratorService];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
  ],
  exports: [...providers, HttpModule],
})
export class SharedModule { }
