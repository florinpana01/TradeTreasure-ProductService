import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {ProductService} from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}
    @Get()
    async all() {
        return this.productService.all();
    }

    @Post()
    async create(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('user_id') user_id: number,
        ) {
        return this.productService.create({
            title,
            description,
            user_id
        });
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.productService.get(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('description') description: string,
    ){
        return this.productService.update(id, {
            title,
            description
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}
