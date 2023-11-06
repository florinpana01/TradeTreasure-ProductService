import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './product.entity';
import { ProductService } from './product.service';
import {ClientsModule, Transport} from '@nestjs/microservices';

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
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://pjfufoya:LuO22_OIV_SIcvDewsRCbu_nTAUooYvt@kangaroo.rmq.cloudamqp.com/pjfufoya'],
          queue: 'products_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
