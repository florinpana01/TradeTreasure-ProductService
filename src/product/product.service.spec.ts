import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import {ProductService} from "./product.service";
import {Product} from "./product.entity";

describe('ProductService', () => {
    let service: ProductService;

    const mockProductRepository = {
        save: jest.fn().mockImplementation((product: Product) => Promise.resolve(product)),
        update: jest.fn().mockImplementation((id, data) => ({id, ...data})),
        find: jest.fn().mockImplementation(() => Promise.resolve([])),
        findOne: jest.fn().mockImplementation((id) => Promise.resolve({
            userId: 1,
            content: "test product",
        }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService, {
                provide: getRepositoryToken(Product),
                useValue: mockProductRepository
            }],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new product', async () => {
        const data = {
            userId: 1,
            title: "test product",
            description: "test description",
        }

        const savedProduct = await service.create(data);
        expect(savedProduct).toBeDefined();
    });

    it('should get one product', async () => {
        const data = {
            id:1,
            userId: 1,
            title: "test product",
            description: "test description",
        }
        const createProduct = await service.create(data);
        const expectedProduct = await service.get(1);
        expect(expectedProduct).toBeDefined();
    });

    // it('should delete one product', async () => {
    //     const data = {
    //         id:1,
    //         userId: 1,
    //         title: "test product",
    //         description: "test description",
    //     }
    //     const createProduct = await service.create(data);
    //     const deletedProduct = await service.delete(1);
    //     expect(deletedProduct).toBeDefined();
    // })

})
