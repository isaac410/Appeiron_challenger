import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { MongoConfig } from './infrastructure/mongo/mongo-config';
import { authGuardProvider } from './infrastructure/auth/constants';

import { AuthModule } from './infrastructure/auth/auth.module';
import { UserModule } from './infrastructure/user/user.module';

import { ProjectModule } from './infrastructure/project/project.module';
import { TaskModule } from './infrastructure/task/task.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfig,
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [authGuardProvider],
})
export class AppModule {}
