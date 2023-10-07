import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // test for commit
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
