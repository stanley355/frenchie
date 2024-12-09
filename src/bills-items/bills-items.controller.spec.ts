import { Test, TestingModule } from '@nestjs/testing';
import { BillsItemsController } from './bills-items.controller';

describe('BillsItemsController', () => {
  let controller: BillsItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillsItemsController],
    }).compile();

    controller = module.get<BillsItemsController>(BillsItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
