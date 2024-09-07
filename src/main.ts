import helmet from 'helmet';
//import * as csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { swaggerConfig } from './infrastructure/swagger/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  // to can do use of class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true,
      transform: true,
    }),
  );
  // Security Settings and Optimization
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression());
  app.use(cookieParser());

  //app.useGlobalFilters(new HttpExceptionFilter());
  swaggerConfig(app);
  await app.listen(4000).then(() => {
    console.log(`Server running on port ${4000}`);
  });
}
bootstrap();
