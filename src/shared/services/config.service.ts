import * as dotenv from 'dotenv';
import { RedisModuleOptions } from 'nestjs-redis';

import { name, version } from '../../../package.json';

// import * as path from 'path';
export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    console.info('Started in', nodeEnv, 'mode');
    dotenv.config({
      path: `.${nodeEnv}.env`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }

    process.env.APP_NAME = name;
    process.env.APP_VERSION = version;

    console.info('________ENV________');
    console.info(process.env);
    console.info('________ENV________');
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  public getBoolean(key: string): boolean {
    return this.get(key) ? this.get(key).toLocaleLowerCase() === 'true' : false;
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get redisConfig(): RedisModuleOptions {
    const config = {
      host: this.get('REDIS_HOST') || '0.0.0.0',
      port: this.getNumber('REDIS_PORT') || 6379,
      db: this.getNumber('REDIS_DB') || 0,
      password: this.get('REDIS_PASSWORD') || null,
      keyPrefix: this.get('REDIS_PRIFIX') || this.get('APP_NAME'),
    };
    return <RedisModuleOptions>config;
  }

  get telegramConfig(): any {
    const config = {
      token: this.get('TG_TOKEN')
    };
    return config;
  }
}
