import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import {ProductService} from './product.service';
import {ClientProxy, EventPattern} from '@nestjs/microservices';
import {log} from 'console';

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private client: ClientProxy,
        ) {}
        @EventPattern('product_request_all')
        async all() {
            console.log('getting all products');
            return this.productService.allProduct();
        }


        @EventPattern('product_created_gateway')
        async create(data) {
            // console.log("product_created_gateway data", data);
            const newProduct = await this.productService.create(data);
            console.log("Product created: ", newProduct);
            this.client.emit('product_created', newProduct);
            return newProduct;
        }

        @EventPattern('product_request_single')
        async get(id: number) {
            const requestedProduct = await this.productService.get(id);
            console.log("getting requested product, ", id);
            return requestedProduct;
        }

        // get the products posted by one user
        //@Get('user/:userId')
        @EventPattern('products_by_user_gateway')
        async getByUser(user_id: number) {
            console.log(`getting all products for user ${user_id}`);
            const products = await this.productService.getByUser(user_id);
            return products;
        }

        @EventPattern('products_by_category_gateway')
        async getByCategory(category: string) {
            console.log(`getting all products from the ${category} section:`);
            const products = await this.productService.getByCategory(category);
            return products;
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
        async delete(id: number) {
            console.log("product deleted id", id);
            this.productService.delete(id);
            this.client.emit('product_deleted', id);
            return HttpStatus.NO_CONTENT;
            
        }
}
