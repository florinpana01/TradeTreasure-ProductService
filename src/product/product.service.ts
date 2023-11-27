import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ProductService {
    // the connection to the database
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){  
    }
    async allProduct(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async create(data): Promise<Product>{
        return this.productRepository.save(data);
    }

    async get(id: number): Promise<Product> {
        const post = await this.productRepository.findOne({
            where: {id},
        });
        return post;
    }
    async getByUser(user_id: number): Promise<Product[]> {
        return this.productRepository.find({ where: { user_id } });
    }
    async getByCategory(category: string): Promise<Product[]> {
        return this.productRepository.find({ where: { category } });
      }
    async update(id: number, data): Promise<any>{
        return this.productRepository.update(id, data);
    }
    
    async delete(id: number): Promise<any> {
        return this.productRepository.delete(id);
    }
    }
