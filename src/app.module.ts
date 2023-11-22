import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { LikeController } from './like/like.controller';
import { LikeService } from './like/like.service';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '35.233.2.49',
      port: 3306,
      username: 'root',
      password: 'Totamealand1983',
      database: 'tradetreasure-products',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
