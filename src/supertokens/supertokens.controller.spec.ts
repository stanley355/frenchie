import { Test, TestingModule } from '@nestjs/testing';
import { SupertokensController } from './supertokens.controller';

describe('SupertokensController', () => {
  let controller: SupertokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupertokensController],
    }).compile();

    controller = module.get<SupertokensController>(SupertokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
