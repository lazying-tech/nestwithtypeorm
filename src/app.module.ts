import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSouceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSouceOptions), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
