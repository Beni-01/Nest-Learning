import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './middlewares/logger.middleware';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService=app.get(ConfigService);
  const originValid={
    origin:process.env.ORIGIN_VALID
  }
  app.setGlobalPrefix(configService.get('GLOBAL_PREFIX'))
  app.enableCors(originValid);
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(Logger)
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE,
    transform:true
  }))
  await app.listen(configService.get('APP_PORT')); 
}
bootstrap();


