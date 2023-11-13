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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Totamealand1983',
      database: 'tt-products',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
