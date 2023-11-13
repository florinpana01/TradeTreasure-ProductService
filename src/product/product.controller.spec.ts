import { HttpStatus } from '@nestjs/common';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';



describe('ProductController', () => {

  let controller: ProductController;

  const mockProductService = {
    create: jest.fn().mockImplementation((data) => ({ id: Date.now(), ...data })),
    update: jest.fn().mockImplementation((id, data) => ({ ...data })),
    get: jest.fn().mockImplementation((id) => ({
      id: 1,
      userId: 1,
      content: "test content"
    })),
    delete: jest.fn().mockImplementation((id) => (HttpStatus.NO_CONTENT))
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.register([
        {
          name: 'PRODUCT_SERVICE',
          transport: Transport.RMQ
        }
      ])],
      controllers: [ProductController],
      providers: [ProductService]
    }).overrideProvider(ProductService).useValue(mockProductService).compile();
    controller = module.get<ProductController>(ProductController);

  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new product', async () => {
    const data = {
      userId: 1,
      title: "test title",
      description: "test description"
    }
    expect(await controller.create(data)).toEqual({
      id: expect.any(Number),
      ...data
    })
  })
  it('should get one product', async () => {
    const data = {
        id:1,
        userId: 1,
        content: "test content",
    }
    await controller.create(data);
    expect(await controller.get(1)).toEqual({
        ...data
    })
  })
});