import { HttpStatus } from '@nestjs/common';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';




describe('LikeController', () => {

  let controller: LikeController;

  const mockLikeService = {
    create: jest.fn().mockImplementation((data) => ({ id: Date.now(), ...data })),
    update: jest.fn().mockImplementation((id, data) => ({ ...data })),
    get: jest.fn().mockImplementation((id) => ({
      id: 1,
      userId: 1,
      productId: 1
    })),
    delete: jest.fn().mockImplementation((id) => (HttpStatus.NO_CONTENT))
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.register([
        {
          name: 'LIKE_SERVICE',
          transport: Transport.RMQ
        }
      ])],
      controllers: [LikeController],
      providers: [LikeService]
    }).overrideProvider(LikeService).useValue(mockLikeService).compile();
    controller = module.get<LikeController>(LikeController);

  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new like', async () => {
    const data = {
      userId: 1,
      productId: 1
    }
    expect(await controller.create(data)).toEqual({
      id: expect.any(Number),
      ...data
    })
  })
});