import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesLogsController } from './inventories-logs.controller';

describe('InventoriesLogsController', () => {
  let controller: InventoriesLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesLogsController],
    }).compile();

    controller = module.get<InventoriesLogsController>(
      InventoriesLogsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
