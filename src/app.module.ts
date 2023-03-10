import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSouceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSouceOptions), UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
