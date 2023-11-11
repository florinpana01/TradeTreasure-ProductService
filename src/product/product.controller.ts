import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import {ProductService} from './product.service';
import {ClientProxy, EventPattern} from '@nestjs/microservices';

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private client: ClientProxy,
        ) {}
        @EventPattern('product_request_all')
        async all() {
            console.log('getting all products');
            return this.productService.all();
        }


        @EventPattern('product_created_gateway')
        async create(data) {
            console.log("product_created_gateway data", data);
            const newProduct = await this.productService.create(data);
            this.client.emit('product_created', newProduct);
            return newProduct;
        }

        @EventPattern('product_request_single')
        async get(@Param('id') id: number) {
            const requestedProduct = await this.productService.get(id);
            console.log("getting requested product, ", id);
            return requestedProduct;
        }

        @EventPattern('product_updated_gateway')
        async update(data) {
            console.log("product_updated_gateway", data);
            await this.productService.update(data.id, data);
            const product = await this.productService.get(data.id);
            console.log("product updated", product);
            this.client.emit('product_updated', product);
            return product;
        }

        @EventPattern('product_deleted_gateway')
        async delete(id) {
            console.log("product deleted id", id);
            this.productService.delete(id);
            this.client.emit('product_deleted', id);
            return HttpStatus.NO_CONTENT;
            
        }
}
